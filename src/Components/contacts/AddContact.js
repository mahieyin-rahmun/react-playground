import React, { Component } from 'react'
import { Consumer } from '../../Context'

import AlertMessage from '../layouts/AlertMessage'
import InputGroup from './InputGroup'

import axios from 'axios'

export default class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: [],
  };

  validateFormData = (data) => {
    return new Promise((resolve, reject) => {
      let { name, email, phone } = data;
      let currentErrors = [];

      let emailPattern = RegExp(/^[a-z0-9._]+@(gmail|yahoo|hotmail|outlook)\.com$/)
      let phonePattern = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);

      if (name.length < 5) {
        currentErrors.push("Name must have more than 5 characters.");
      }

      if (!emailPattern.test(email)) {
        currentErrors.push("Invalid email. Only yahoo.com, gmail.com, hotmail.com, outlook.com supported");
      }

      if (!phonePattern.test(phone)) {
        currentErrors.push("Phone number must be in the following format: 111-111-1111");
      }

      this.setState({
        ...this.state,
        errors: currentErrors
      });

      resolve(currentErrors);
    });
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (dispatch, event) => {
    event.preventDefault();

    this
      .validateFormData(this.state)
      .then((errs) => {
        if (errs.length === 0) {
          let { name, email, phone } = this.state;

          let newContact = {
            name,
            email,
            phone
          };

          axios.post("https://jsonplaceholder.typicode.com/users/", newContact)
            .then((response) => {
              dispatch({
                type: "ADD_CONTACT",
                payload: response.data
              });

              // reset state after adding new contact
              this.setState({
                name: "",
                email: "",
                phone: "",
                errors: []
              });

              // redirect to the home page after adding new contact
              this.props.history.push("/react-playground");
            });
        }
      });
  }


  render() {
    let { name, email, phone } = this.state;

    return (
      <Consumer>
        {
          value => {
            const { dispatch } = value;

            return (
              <div className="card mb-3 mt-4">
                <div className="card-header">Add Contact</div>
                <React.Fragment>
                  {
                    this.state.errors.map((errorMsg, index) => (
                      <AlertMessage message={errorMsg} className="alert alert-danger" key={index} />
                    ))
                  }
                </React.Fragment>
                <div className="card-body">
                  <form>
                    <InputGroup
                      label="Name"
                      type="text"
                      name="name"
                      placeholder="e.g. Awesome Human"
                      value={name}
                      onChange={this.handleChange}
                    />
                    <InputGroup
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="e.g. jfk@xyz.com"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <InputGroup
                      label="Phone Number"
                      type="text"
                      name="phone"
                      placeholder="e.g. 567-567-5959"
                      value={phone}
                      onChange={this.handleChange}
                    />
                    <input
                      className="btn btn-large btn-block"
                      type="submit"
                      value="Add New Contact"
                      onClick={this.handleSubmit.bind(this, dispatch)}
                    />
                  </form>
                </div>
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}
