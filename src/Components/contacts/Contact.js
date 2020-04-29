import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Consumer } from '../../Context'

export default class Contact extends Component {
	state = { show: false };

	toggleShowDetails = (event) => {
		// setting the state
		this.setState({
			show: !this.state.show
		});
	}

	deleteContact = (id, dispatch, event) => {
		console.log("here");
		
		dispatch({
			type: "DELETE_CONTACT",
			payload: id
		});
	}

	render() {
		return (
			<Consumer>
				{
					value => {
						const { dispatch } = value;
						let { id, name, email, phone } = this.props.contact;

						return (
							<div className="mt-4 card card-body">
								<h5 className="alert alert-dark">
									Name: <strong> {name.toUpperCase()} </strong>
									<span>
										<FontAwesomeIcon
											icon="sort-down"
											onClick={this.toggleShowDetails}
										/>
									</span>
									<span className="float-right" style={{ color: "red" }}>
										<FontAwesomeIcon
											icon="user-minus"
											onClick={this.deleteContact.bind(this, id, dispatch)}
										/>
									</span>
								</h5>
								{
									// check value of show variable
									this.state.show ?
										// render the info if it is true
										(
											<ul className="list-group">
												<li className="list-group-item">
													<strong>Email</strong>: {email}
												</li>
												<li className="list-group-item">
													<strong>Phone Number</strong>: {phone}
												</li>
											</ul>
										) :
										// else render an empty fragment
										<React.Fragment>
										</React.Fragment>
								}
							</div>
						)
					}
				}
			</Consumer>
		)
	}
}
