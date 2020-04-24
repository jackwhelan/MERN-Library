import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar.component';
import { Redirect } from 'react-router-dom';

class GoodbyeView extends Component {
    checkLogged = () => {
        if (localStorage.getItem('TOKEN')) {
            return <Redirect to="/Dashboard" />
        }
        else {
            return (<h4>You are now signed out.</h4>)
        }
    }

    render() {
        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container bg-light p-5">
                    {
                        this.checkLogged()
                    }
                </div>
            </div>
        )
    }
}

export default GoodbyeView;