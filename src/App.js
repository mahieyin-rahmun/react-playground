import React, { Component } from 'react';
import Header from './Components/layouts/Header';
import Contacts from './Components/contacts/Contacts'
import { Provider } from './Context'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSortDown, faUserMinus } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faSortDown, faUserMinus);

class App extends Component {
	render() {
		return (
			<Provider>
				<div className="container">
					<Header title="Contact Manager" />
					<Contacts />
				</div>
			</Provider>
		)
	}
}

export default App;