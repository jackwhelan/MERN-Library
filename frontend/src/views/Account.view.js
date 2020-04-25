import React, { Component } from 'react';

import AppNavbar from '../components/AppNavbar.component';
import ModifyUserForm from '../components/ModifyUserForm.component';

class AccountView extends Component {
    render() {
        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    <div className="card bg-light pb-4">
                        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                            <h4 className="card-title mt-3 text-center">My Account</h4>
                            <p className="text-center">Modify your account details below</p>
                            <ModifyUserForm />
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountView;