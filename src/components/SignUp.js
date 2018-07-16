import React, { Component } from 'react';
import { 
    Link,
    withRouter,
} from 'react-router-dom';

import {signUp, login} from '../services/authenticationService';
import withAgeAuthorization from './withAgeAuthorization';
import ErrorToast from './ErrorToast';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <div className="jc-center valign-wrapper">
        <h1>SIGN UP</h1>
    </div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    checkTerms: false,
    file1: '',
    file2: '',
    error: null
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  componentDidMount() {
    const elem = document.getElementById('govID')
    M.Modal.init(elem, {});

    const elem2 = document.getElementById('supportingDocumentation');
    M.Modal.init(elem2, {});
  }

  onSubmit = (event) => {
    
    const {
        email,
        passwordOne,
      } = this.state;

    const {
        history,
    } = this.props;

    const form = event.target;
    const data = new FormData(form);
    const credentials = {email: email, password: passwordOne}

    signUp(data)
        .then(authUser => {
            login(credentials)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.STORE);
            }, (failure) => {
                this.setState(byPropKey('error', failure))
            })
        }, (failure) => {
            this.setState(byPropKey('error', failure))
        })  

    event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        checkTerms,
        file1,
        file2,
        error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      checkTerms === false ||
      file1 === '' ||
      file2 === ''

    const isFile1Selected = 
        file1 === ''
    
    const isSupportingDocumentCompleted = 
        file2 === ''

    return (
        <div className="valign-wrapper jc-center">
            <form onSubmit={this.onSubmit} className="container">
                <div className="row input-field col s12">
                    <input value={username} name="username" onChange={event => this.setState(byPropKey('username', event.target.value))} type="text"/>
                    <label htmlFor="email">Full Name</label>
                </div>
                <div className="input-field col s12">
                    <input value={email} name="email" onChange={event => this.setState(byPropKey('email', event.target.value))} type="text"/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input value={passwordOne} name="password" onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password"/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12">
                    <input value={passwordTwo} name="passwordTwo" onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password"/>
                    <label htmlFor="email">Confirm Password</label>
                </div>
                { error && <ErrorToast error={error} clearError={(error) => this.setState(byPropKey('error', error))} /> }
                <div className="row col s12">
                    <button data-target="govID" className="btn m-r-16 grey darken-3 modal-trigger">Government issued ID</button>
                 </div>
                 <div className="row col s12"> 
                    <button data-target="supportingDocumentation" className="btn m-r-16 grey darken-3 modal-trigger">Prescription/Dispensary Card</button>
                </div>
                <div>
                    <p>
                        <label>
                            <input type="checkbox" name="checkbox" value={checkTerms} onChange={event => {this.setState(byPropKey('checkTerms', !this.state.checkTerms))}}/>
                                <span>I agree to the terms and conditions</span>
                        </label>
                    </p>
                </div>

                <div id="govID" className="modal">
                    <div className="modal-content">
                        <div className="jc-center valign-wrapper">
                            <p>Upload a piece of government issued ID </p>
                        </div>
                        <div className="file-field input-field">
                            <div className="btn m-r-16 grey darken-3">
                                <span>File</span>
                                <input type="file" name="file1" value={file1} onChange={event => {this.setState(byPropKey('file1', event.target.value))}}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row col s12">
                            <button type="button" id="govID" className="modal-action modal-close btn m-r-16 grey darken-3" disabled={isFile1Selected}> Continue </button>
                        </div>
                    </div>
                </div>

                <div id="supportingDocumentation" className="modal">
                    <div className="modal-content">
                        <div className="file-field input-field">
                            <p> Upload an image of a prescription or dispensary card.</p>
                            <div className="btn m-r-16 grey darken-3">
                                <span>File</span>
                                <input type="file" name="file2" value={file2} onChange={event => {this.setState(byPropKey('file2', event.target.value))}}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row col s12">
                            <button type="button" id="supportingDocumentation" className="modal-action modal-close btn m-r-16 grey darken-3" disabled={isSupportingDocumentCompleted}> Continue </button>
                        </div>
                    </div>
                </div>

                <div className="row col s12">
                    <button className="btn m-r-16 grey darken-3" disabled={isInvalid} type="submit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
  }
}

const SignUpLink = () =>
  <p className="valign-wrapper jc-center">
    <span style={{whiteSpace: "normal"}}>
        Don't have an account?{' '}<Link to={routes.SIGN_UP}>Sign up</Link>
    </span>
  </p>

export default withAgeAuthorization(withRouter(SignUpPage));

export {
  SignUpForm,
  SignUpLink,
};