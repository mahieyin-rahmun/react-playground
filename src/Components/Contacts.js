import React, { Component } from 'react'
import Contact from "./Contact"

class Contacts extends Component {
    constructor() {
        super();
        this.state = {
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
            ]
        }
    }

    deleteContactWithId(toDeleteId, event) {
        let { contacts } = this.state;
        let updatedContacts = contacts.filter(contact => contact.id !== toDeleteId);
        this.setState({
            contacts: updatedContacts
        });
    }

    render() {
        const { contacts } = this.state;

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
    }
}

export default Contacts;