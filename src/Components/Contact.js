import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        let { name, email, phone } = this.props.contact;
        return (
            <div className="mt-4">
                <h5 className="alert alert-dark">
                    Name: <strong> {name.toUpperCase()} </strong>
                </h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Email</strong>: {email}
                    </li>
                    <li className="list-group-item">
                        <strong>Phone Number</strong>: {phone}
                    </li>
                </ul>
            </div >
        )
    }
}
