import React, { Component } from 'react'
import Contact from "./Contact"
import { Consumer } from '../../Context'

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            const { contacts } = value;
            return (
              <React.Fragment>
                <h1 className="display-4 mb-3">
                  <span className="text-danger">Contact List</span>
                </h1>
                {
                  contacts.length > 0 ?
                    contacts.map(contact => (
                      <Contact
                        key={contact.id}
                        contact={contact}
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