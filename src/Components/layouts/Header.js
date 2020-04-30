import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
	render() {
		let { title } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">{title}</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/add">Add Contact</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">About</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}
