import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar.component';
import Alert from '../components/Alert.component';
import { Redirect } from 'react-router-dom';
import Search from '../components/Search.component';

class LibraryView extends Component {
    state = {
        info: undefined
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                info: this.props.location.state
            })
        }

        if (!localStorage.getItem('TOKEN')) {
            this.setState({
                redirect: true
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({
            search: event.target.value
        });
    }

    render() {
        let alertIfInfo;

        if (this.state.info) {
            alertIfInfo = <Alert response={this.state.info} />
        }

        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/",
                state: {
                    status: "warning",
                    header: "Access Restricted",
                    message: "You must be signed in to access the Library page."
                }
            }} />
        }

        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    {alertIfInfo}
                    <Search/>
                </div>
            </div>
        )
    }
}

export default LibraryView;
