import React, { Component } from 'react';
import axios from 'axios';
import FormInput from './FormInput.component';
import { Redirect } from 'react-router-dom';
import Alert from './Alert.component.js';
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = "bd601f7c72aba3ea7e3ed2f0146891868672148b646b386cc6577e823ff96ae7459ee14a6f4998a9e914f270b627aed8a54bd83d56a7ca3841031fffed194717"

class RegistrationForm extends Component {
    state = {
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    handleFirstNameChange = (event) => {
        let newFirstName = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.firstname = newFirstName;
            return { user };
        });
    }

    handleLastNameChange = (event) => {
        let newLastName = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.lastname = newLastName;
            return { user };
        });
    }

    handleEmailChange = (event) => {
        let newEmail = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.email = newEmail;
            return { user };
        });
    }

    handlePasswordChange = (event) => {
        let newPassword = event.target.value;

        this.setState(previousState => {
            let user = { ...previousState.user }
            user.password = newPassword;
            return { user };
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            error: undefined
        });

        axios.patch('http://localhost:5000/user/' + jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).id, this.state.user)
            .then(res => {
                console.log(res.data);
                this.setState({
                    response: res.data
                });
            })
            .then(() => {
                if (this.state.response.status === "error") {
                    this.setState({
                        error: this.state.response
                    });
                }
                else {
                    localStorage.setItem('TOKEN', this.state.response.token);
                    this.setState({
                        redirect: true
                    });
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        if (!localStorage.getItem('TOKEN')) {
            this.setState({
                redirect: true
            });
        }
        else
        {
            this.setState({
                user: {
                    firstname: jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).firstname,
                    lastname: jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).lastname,
                    email: jwt.verify(localStorage.getItem('TOKEN'), ACCESS_TOKEN_SECRET).email,
                    password: ''
                }
            })
        }
    }

    render() {
        let alertIfError;

        if (this.state.error) {
            alertIfError = <Alert response={this.state.error} />
        }
        else {
            let redirectState = this.state;
            if (this.state.redirect === true) {
                localStorage.setItem('TOKEN', redirectState.response.token)
                return <Redirect to={{
                    pathname: "/",
                    state: redirectState.response
                }} />
            }
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {alertIfError}
                <FormInput
                    icon="fa fa-user"
                    type="text"
                    value={this.state.user.firstname}
                    onChange={this.handleFirstNameChange}
                    min="2"
                    max="30"
                    label="First Name"
                />

                <FormInput
                    icon="fa fa-user"
                    type="text"
                    value={this.state.user.lastname}
                    onChange={this.handleLastNameChange}
                    min="2"
                    max="30"
                    label="Last Name"
                />

                <FormInput
                    icon="fa fa-envelope"
                    type="email"
                    value={this.state.user.email}
                    onChange={this.handleEmailChange}
                    label="Email Address"
                />

                <hr></hr>
                <p className="text-center">Enter password to confirm changes</p>

                <FormInput
                    icon="fa fa-lock"
                    type="password"
                    value={this.state.user.password}
                    onChange={this.handlePasswordChange}
                    min="6"
                    max="100"
                    label="Password"
                />

                <button type="submit" className="btn btn-primary btn-block">Submit Changes</button>
            </form>
        )
    }
}

export default RegistrationForm;
