import React, { Component } from 'react';
import Header from './Components/Header';
import Contacts from './Components/Contacts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faSortDown)

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