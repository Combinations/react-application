import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import {login} from '../services/authenticationService';
import * as routes from '../constants/routes';
import { PasswordForgetLink } from './PasswordForget';
import withAgeAuthorization from './withAgeAuthorization';
import ErrorToast from './ErrorToast';

const SignInPage = ({ history }) =>
  <div>
    <div className="jc-center valign-wrapper">
        <h1>SIGN IN</h1>
    </div>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    login(email, password)
        .then(authUser => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.STORE);
        }, (failure) => {
            this.setState(byPropKey('error', failure.data))
        })

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
    <div className="valign-wrapper jc-center">
      <form onSubmit={this.onSubmit} className="container">
        <div class="row input-field col s12">
            <input value={email} type="text" onChange={event => this.setState(byPropKey('email', event.target.value))}/>
            <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
                <input value={password} type="password" onChange={event => this.setState(byPropKey('password', event.target.value))}/>
                <label for="email">Password</label>
        </div>
        { error && <ErrorToast error={error} clearError={(error) => this.setState(byPropKey('error', error))} />}
        <div className="row col s12">
            <button class="btn m-r-16 grey darken-3" disabled={isInvalid} type="submit">
            Sign in
            </button>
        </div>
      </form>
    </div>
    );
  }
}

export default withAgeAuthorization(withRouter(SignInPage));

export {
  SignInForm,
};