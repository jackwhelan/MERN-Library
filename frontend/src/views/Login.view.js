import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar.component';
import LoginForm from '../components/LoginForm.component';

class LoginView extends Component {
    render() {
        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    <div className="card bg-light pb-4">
                        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            <h4 className="card-title mt-3 text-center">Log In</h4>
                            <p className="text-center">Log in to access all the features!</p>
                            <LoginForm />
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginView;
