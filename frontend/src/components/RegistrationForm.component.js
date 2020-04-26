import React, { Component } from 'react';
import axios from 'axios';
import FormInput from './FormInput.component';
import { Redirect } from 'react-router-dom';
import Alert from './Alert.component.js';

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

        axios.post('http://localhost:5000/user/register', this.state.user)
        .then(res => {
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
            else
            {
                this.setState({
                    redirect: true
                });
            }
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        if (localStorage.getItem('TOKEN')) {
            this.setState({
                redirect: true
            });
        }
    }

    render() {
        let alertIfError;

        if (this.state.error) {
            alertIfError = <Alert response={this.state.error} />
        }
        else
        {
            if (this.state.redirect === true) {
                return <Redirect to={{
                    pathname: "/",
                    state: {
                        status: "success",
                        header: "Registration Succesful",
                        message: "Your registration has been successfully processed and you can now log in to your new account with the login button in the top right."
                    }
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
                    required={true}
                />

                <FormInput
                    icon="fa fa-user"
                    type="text"
                    value={this.state.user.lastname}
                    onChange={this.handleLastNameChange}
                    min="2"
                    max="30"
                    label="Last Name"
                    required={true}
                />

                <FormInput
                    icon="fa fa-envelope"
                    type="email"
                    value={this.state.user.email}
                    onChange={this.handleEmailChange}
                    label="Email Address"
                    required={true}
                />

                <FormInput
                    icon="fa fa-lock"
                    type="password"
                    value={this.state.user.password}
                    onChange={this.handlePasswordChange}
                    min="6"
                    max="100"
                    label="Password"
                    required={true}
                />

                <button type="submit" className="btn btn-primary btn-block">Register</button>
           </form>
        )
    }
}

export default RegistrationForm;
