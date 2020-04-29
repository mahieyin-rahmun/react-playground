import React, { Component } from 'react'

export default class Errors extends Component {
  render() {
    return (
      <div className="alert alert-danger">
        {this.props.message}
      </div>
    )
  }
}
