import React, { Component } from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
			}

		case "ADD_CONTACT":
			let contacts = state.contacts;
			contacts.push(action.payload);

			return {
				...state,
				contacts: contacts
			}

		default:
			return state;
	}
}

export class Provider extends Component {
	state = {
		contacts: [],
		// a function that is in charge of dispatching the actions from the UI to the Provider
		dispatch: (action) => {
			// the React API only takes the new state as the first argument now			
			this.setState(reducer(this.state, action));
		}
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((jsonData) => {
				let contactsData = [];

				jsonData.forEach((user) => {
					let userObject = {
						id: user.id,
						name: user.name,
						email: user.email,
						phone: user.phone
					};

					contactsData.push(userObject);
				});

				return contactsData;
			})
			.then((contactsData) => this.setState({
				...this.state,
				contacts: contactsData
			}));
	}

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

export const Consumer = Context.Consumer;