import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './Components/layouts/Header';
import Contacts from './Components/contacts/Contacts'
import { Provider } from './Context'
import AddContact from './Components/contacts/AddContact'
import About from './Components/pages/About'
import NotFound from './Components/pages/NotFound'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSortDown, faUserMinus, faPen } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faSortDown, faUserMinus, faPen);

class App extends Component {
	render() {
		return (
			<Provider>
				<Router>
					<div className="container">
						<Header title="Contact Manager" />
						<Switch>
							<Route exact path="/" component={Contacts} />
							<Route exact path="/add" component={AddContact} />
							<Route exact path="/about" component={About} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;