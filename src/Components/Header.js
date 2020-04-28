import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        let { title } = this.props;
        return (
            <div>
                <h1 className="alert alert-primary">{title}</h1>
            </div>
        )
    }
}
