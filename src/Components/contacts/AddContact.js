import React, { Component } from 'react'
import { Consumer } from '../../Context'
import Errors from '../layouts/Errors'
import { generateID, maxIdLength } from '../../Utils'

export default class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: []
  };

  validateFormData = (data) => {
    return new Promise((resolve, reject) => {
      let { name, email, phone } = data;
      let currentErrors = [];

      let emailPattern = RegExp(/^[a-z0-9._]*@(gmail|yahoo|hotmail|outlook)\.com$/)
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

          dispatch({
            type: "ADD_CONTACT",
            payload: {
              id: generateID(maxIdLength),
              name,
              email,
              phone
            }
          });

          // reset state after adding new contact
          this.setState({
            name: "",
            email: "",
            phone: "",
            errors: []
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
                      <Errors message={errorMsg} key={index} />
                    ))
                  }
                </React.Fragment>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        placeholder="e.g. Awesome Human"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="email"
                        placeholder="e.g. jfk@xyz.com"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="phone"
                        placeholder="e.g. 567-567-5959"
                        value={phone}
                        onChange={this.handleChange}
                      />
                    </div>

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
