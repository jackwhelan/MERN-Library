import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar.component';
import Alert from '../components/Alert.component';
import News from '../components/NewsFeed.component';

class HomeView extends Component {
    render() {
        let alertIfInfo;

        if (this.props.location.state) {
            alertIfInfo = <Alert response={this.props.location.state} />
        }

        return (
            <div>
                <AppNavbar token={localStorage.getItem('TOKEN')} />
                <div className="container">
                    {alertIfInfo}
                    <News/>
                </div>
            </div>
        )
    }
}

export default HomeView;
