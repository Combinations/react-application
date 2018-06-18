import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {passwordReset} from '../services/authenticationService';

const PasswordForgetPage = () =>
  <div>
    <div className="jc-center valign-wrapper">
        <h1>Recovery</h1>
    </div>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    passwordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
    <div className="valign-wrapper jc-center">
      <form onSubmit={this.onSubmit} className="container">
        <div className="row input-field col s12">
            <input value={this.state.email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text"/>
            <label htmlFor="email">Email</label>
            <button className="btn m-r-16 grey darken-3" disabled={isInvalid} type="submit">
            Reset My Password
            </button>

            { error && <p>{error.message}</p> }
        </div>
      </form>
    </div>
    );
  }
}

const PasswordForgetLink = () =>
  <p className="valign-wrapper jc-center">
    <Link to="/pw-forget">Lost Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};