import React, { Component } from 'react';
import Header from './Components/Header';
import Contact from "./Components/Contact";

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header title="Contact Manager" />
				<Contact name="John Doe" email="jdoe@gmail.com" phone="555-555-5555" />
				<Contact name="Robert Downey Jr." email="robertd@gmail.com" phone="333-333-3333" />
			</div>
		)
	}
}

export default App;