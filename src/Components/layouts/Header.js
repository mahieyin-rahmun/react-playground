import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
	render() {
		let { title } = this.props;
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link class="navbar-brand" to="/">{title}</Link>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="/add">Add Contact</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="/about">About</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	}
}
