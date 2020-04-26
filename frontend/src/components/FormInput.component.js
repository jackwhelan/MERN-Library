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
                    minLength={this.props.min}
                    maxLength={this.props.max}
                    placeholder={this.props.label}
                    required={this.props.required}
                />
            </div>
        )
    }
}

export default FormInput;
