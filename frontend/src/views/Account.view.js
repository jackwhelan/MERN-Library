import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AppNavbar from '../components/AppNavbar.component';
import ModifyUserForm from '../components/ModifyUserForm.component';

class AccountView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('TOKEN')) {
            this.setState({
                redirect: true
            });
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/",
                state: {
                    status: "warning",
                    header: "Access Restricted",
                    message: "You must be signed in to access your Account page."
                }
            }} />
        }

        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    <div className="card bg-light pb-4 mt-3">
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