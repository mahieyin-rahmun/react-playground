import React, { Component } from 'react';
import Header from './Components/Header';
import Contacts from './Components/Contacts'

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header title="Contact Manager" />
				<Contacts />
			</div>
		)
	}
}

export default App;