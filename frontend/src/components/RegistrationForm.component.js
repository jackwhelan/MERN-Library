import React, { Component } from 'react';
import axios from 'axios';

class RegistrationForm extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        });
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        });
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/user/register', this.state)
        .then(res => {
            this.setState({
                response: res.data
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
           <form onSubmit={this.handleSubmit}>
               <label>First Name</label>
               <input
                    type="text"
                    className="form-control mb-3"
                    value={this.state.firstname}
                    onChange={this.handleFirstNameChange}
                    minLength="2"
                    maxLength="30"
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control mb-3"
                    value={this.state.lastname}
                    onChange={this.handleLastNameChange}
                    minLength="2"
                    maxLength="30"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    className="form-control mb-3"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    className="form-control mb-3"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    minLength="6"
                    maxLength="100"
                    required
                />

                <button type="submit" className="btn btn-primary">Submit</button>
           </form>
        )
    }
}

export default RegistrationForm;
