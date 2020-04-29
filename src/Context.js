import React, { Component } from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "DELETE_CONTACT":
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload)
			}
	
		default:
			return state;		
	}
}

export class Provider extends Component {
	state = {
		contacts: [
			{
				id: 1,
				name: "John Doe",
				email: "jdoe@gmail.com",
				phone: "555-555-5555"
			},
			{
				id: 2,
				name: "Robert Downey Jr.",
				email: "robertd@gmail.com",
				phone: "333-333-3333"
			},
			{
				id: 3,
				name: "Luna Lovegood",
				email: "luna.lovegood@outlook.com",
				phone: "777-777-7777"
			}
		],
		// a function that is in charge of dispatching the actions from the UI to the Provider
		dispatch: (action) => {
			// the React API only takes the new state as the first argument now			
			this.setState(reducer(this.state, action));
		}
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