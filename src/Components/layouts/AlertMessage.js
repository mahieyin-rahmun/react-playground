import React, { Component } from 'react'

export default class AlertMessage extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.message}
      </div>
    )
  }
}
