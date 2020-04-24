import React, { Component } from 'react';
import TopNav from '../components/TopNav.component';
import RegistrationForm from '../components/RegistrationForm.component';

class RegisterView extends Component {
    render() {
        return (
            <div>
                <TopNav/>
                <div className="container mt-5">
                    <RegistrationForm />
                </div>
            </div>
        )
    }
}

export default RegisterView;
