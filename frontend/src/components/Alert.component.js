import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {}
        }
    }

    componentDidMount() {
        var bgColor;

        if (this.props.response.status.includes("error")) {
            bgColor = '#d9534f';
        }
        else if (this.props.response.status.includes("success")) {
            bgColor = '#5cb85c';
        }
        else {
            bgColor = '#f0ad4e';
        }

        this.setState({
            style: {
                backgroundColor: bgColor
            }
        });
    }

    render() {
        return (
            <div className="infoComponent" style={this.state.style}>
                <h5>{this.props.response.header}</h5>
                <p>{this.props.response.message}</p>
            </div>
        )
    }
}

export default Alert;