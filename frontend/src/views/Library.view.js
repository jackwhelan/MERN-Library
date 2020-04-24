import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar.component';
import Alert from '../components/Alert.component';

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
    }

    componentDidUpdate() {
        console.log('updated')
    }

    render() {
        let alertIfInfo;

        if (this.state.info) {
            alertIfInfo = <Alert response={this.state.info} />
        }

        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    {alertIfInfo}
                </div>
            </div>
        )
    }
}

export default LibraryView;
