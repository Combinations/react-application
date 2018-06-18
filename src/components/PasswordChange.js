import React, { Component } from 'react';

import {passwordChange} from '../services/authenticationService'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    passwordChange(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
    <div className="valign-wrapper jc-center">
      <form onSubmit={this.onSubmit} className="container">
        <div className="input-field col s12">
            <input value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password"/>
            <label htmlFor="passwordOne">New Password</label>
        </div>
        <div className="input-field col s12">
            <input value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password"/>
            <label htmlFor="passwordTwo">Confirm New Password</label>
        </div>
        <div className="row col s12">
            <button className="btn m-r-16 grey darken-3" disabled={isInvalid} type="submit">
            Change Password
            </button>
        </div>

        { error && <p>{error.message}</p> }
      </form>
    </div>
    );
  }
}

export default PasswordChangeForm;