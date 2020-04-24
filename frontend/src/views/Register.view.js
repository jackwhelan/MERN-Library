import React, { Component } from 'react';
import RegistrationForm from '../components/RegistrationForm.component';
import AppNavbar from '../components/AppNavbar.component';

class RegisterView extends Component {
    render() {
        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    <div className="card bg-light pb-4">
                        <article className="card-body mx-auto" style={{maxWidth:"400px"}}>
                            <h4 className="card-title mt-3 text-center">Registration</h4>
                            <p className="text-center">Get started with your free account</p>
                            <RegistrationForm />
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterView;
