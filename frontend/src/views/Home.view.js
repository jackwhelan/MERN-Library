import React, { Component } from 'react';
import TopNav from '../components/TopNav.component';
import Alert from '../components/Alert.component';

class HomeView extends Component {
    render() {
        let alertIfInfo;

        if (this.props.location.state) {
            alertIfInfo = <Alert response={this.props.location.state} />
        }

        return (
            <div className="container">
                <TopNav/>
                {alertIfInfo}
                home
            </div>
        )
    }
}

export default HomeView;
