import React, { Component } from 'react'
import Contact from "./Contact"
import { Consumer } from '../Context'

class Contacts extends Component {
    deleteContactWithId(toDeleteId, event) {
        let { contacts } = this.state;
        let updatedContacts = contacts.filter(contact => contact.id !== toDeleteId);
        this.setState({
            contacts: updatedContacts
        });
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { contacts } = value;
                    return (
                        <React.Fragment>
                        {
                            contacts.length > 0 ?
                                contacts.map(contact => (
                                    <Contact
                                        key={contact.id}
                                        contact={contact}
                                        deleteContact={this.deleteContactWithId.bind(this, contact.id)}
                                    />
                                )) :
                                <div className="alert alert-success d-flex justify-content-center" >
                                    No contacts found!
                                </div>
                        }
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )
    }
}

export default Contacts;