import React, { Component } from 'react';
import TopNav from '../components/TopNav.component';
import RegistrationForm from '../components/RegistrationForm.component';

class RegisterView extends Component {
    render() {
        return (
            <div>
                <TopNav/>
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
