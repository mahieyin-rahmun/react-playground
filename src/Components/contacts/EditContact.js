import React, { Component } from 'react'
import { Consumer } from '../../Context'

import AlertMessage from '../layouts/AlertMessage'
import InputGroup from './InputGroup'

import axios from 'axios'

export default class AddContact extends Component {
	state = {
		name: "",
		email: "",
		phone: "",
		errors: [],
		updating: false,
		fetching: false
	};

	validateFormData = (data) => {
		return new Promise((resolve, reject) => {
			let { name, email, phone } = data;
			let currentErrors = [];

			let emailPattern = RegExp(/^[a-z0-9._]+@(gmail|yahoo|hotmail|outlook)\.com$/)
			let phonePattern = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);

			if (name.length < 5) {
				currentErrors.push("Name must have more than 5 characters.");
			}

			if (!emailPattern.test(email)) {
				currentErrors.push("Invalid email. Only yahoo.com, gmail.com, hotmail.com, outlook.com supported");
			}

			if (!phonePattern.test(phone)) {
				currentErrors.push("Phone number must be in the following format: 111-111-1111");
			}

			this.setState({
				...this.state,
				errors: currentErrors
			});

			resolve(currentErrors);
		});
	}


	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = (dispatch, event) => {
		event.preventDefault();

		this
			.validateFormData(this.state)
			.then((errs) => {
				if (errs.length === 0) {
					// toggle updating state
					this.setState({
						...this.state,
						updating: true
					});

					let { name, email, phone } = this.state;
					let id = this.props.match.params.id

					let updatedContact = {
						name,
						email,
						phone
					};

					axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact)
						.then((response) => {
							dispatch({
								type: "UPDATE_CONTACT",
								payload: response.data
							});

							// reset state after adding new contact
							this.setState({
								name: "",
								email: "",
								phone: "",
								errors: [],
								updating: false
							});

							// redirect to the home page after adding new contact
							this.props.history.push("/react-playground");
						});
				}
			});
	}

	componentDidMount() {
		this.setState({
			...this.state,
			fetching: !this.state.fetching
		});

		let userId = this.props.match.params.id;
		fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
			.then((response) => response.json())
			.then((jsonData) => {
				let { name, email, phone } = jsonData;
				this.setState({
					...this.state,
					name: name,
					email: email,
					phone: phone
				});

				this.setState({
					...this.state,
					fetching: !this.state.fetching
				});
			});
	}


	render() {
		let { name, email, phone } = this.state;

		return (
			<Consumer>
				{
					value => {
						const { dispatch } = value;

						return (
							this.state.fetching ?
								(<React.Fragment>
									<AlertMessage className="alert alert-info mt-4" message="Loading data..." />
								</React.Fragment>) : (
									<div className="card mb-3 mt-4">
										<React.Fragment>
											{
												this.state.updating ? (
													<AlertMessage className="alert alert-info" message="Updating contact..." />
												) :
													<div className="card-header">Update Contact</div>
											}
										</React.Fragment>
										<React.Fragment>
											{
												this.state.errors.map((errorMsg, index) => (
													<AlertMessage message={errorMsg} className="alert alert-danger" key={index} />
												))
											}
										</React.Fragment>
										<div className="card-body">
											<form>
												<InputGroup
													label="Name"
													type="text"
													name="name"
													placeholder="e.g. Awesome Human"
													value={name}
													onChange={this.handleChange}
												/>
												<InputGroup
													label="Email"
													type="email"
													name="email"
													placeholder="e.g. jfk@xyz.com"
													value={email}
													onChange={this.handleChange}
												/>
												<InputGroup
													label="Phone Number"
													type="text"
													name="phone"
													placeholder="e.g. 567-567-5959"
													value={phone}
													onChange={this.handleChange}
												/>
												{
													this.state.updating ?
														<input
															className="btn btn-large btn-block"
															type="submit"
															value="Update Contact"
															onClick={this.handleSubmit.bind(this, dispatch)}
															disabled
														/>
														: <input
															className="btn btn-large btn-block"
															type="submit"
															value="Update Contact"
															onClick={this.handleSubmit.bind(this, dispatch)}
														/>
												}
											</form>
										</div>
									</div>
								)
						)
					}
				}
			</Consumer>
		)
	}
}
