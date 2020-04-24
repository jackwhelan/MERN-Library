import React, { Component } from 'react';

class FormInput extends Component {
    render() {
        return (
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"> <i className={this.props.icon}></i> </span>
                </div>
                <input
                    type={this.props.type}
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    minLength="2"
                    maxLength="30"
                    placeholder={this.props.label}
                    required
                />
            </div>
        )
    }
}

export default FormInput;
