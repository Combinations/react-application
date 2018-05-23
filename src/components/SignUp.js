import React, { Component } from 'react';
import { 
    Link,
    withRouter,
} from 'react-router-dom';

import axios from 'axios';

import {signUp, login} from '../services/authenticationService';
import withAgeAuthorization from './withAgeAuthorization';
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
    reason1: false,
    reason2: false,
    reason3: false,
    error: null,
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
    const elem = document.getElementById('firstmodal')
    const instance = M.Modal.init(elem, {});

    const elem2 = document.getElementById('secondmodal');
    const instance2 = M.Modal.init(elem2, {});

    const elem3 = document.querySelector('.collapsible');
    const instance3 = M.Collapsible.init(elem3, {});

    const elem4 = document.getElementById('termAndconditionModal');
    const instance4 = M.Modal.init(elem4, {});
  }

  showTermsAndConditions(){ 
    const elem = document.getElementById('termAndconditionModal');
    const instance =M.Modal.getInstance(elem, {});
      instance.open();
  }

  onSubmit = (event) => {
    
    const {
        username,
        email,
        passwordOne,
        checkTerms,
        file1,
        file2,
        reason1,
        reason2,
        reason3
      } = this.state;

    const {
        history,
    } = this.props;

    const form = event.target;
    const data = new FormData(form);

    signUp(data)
        .then(authUser => {
            login(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.STORE);
            }, (failure) => {
                this.setState(byPropKey('error', failure.data))
            })
        }, (failure) => {
            this.setState(byPropKey('error', failure.data))
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
        reason1,
        reason2,
        reason3,
        error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      checkTerms === false ||
      file1 === '' ||
      (file2 === '' && (reason1 === false && reason2 === false && reason3 === false))

    const isFile1Selected = 
        file1 === ''
    
    const isSupportingDocumentCompleted = 
        (file2 === '' && (reason1 === false && reason2 === false && reason3 === false))

    return (
        <div className="valign-wrapper jc-center">
            <form onSubmit={this.onSubmit} className="container">
                <div class="row input-field col s12">
                    <input value={username} name="username" onChange={event => this.setState(byPropKey('username', event.target.value))} type="text"/>
                    <label for="email">Full Name</label>
                </div>
                <div class="input-field col s12">
                    <input value={email} name="email" onChange={event => this.setState(byPropKey('email', event.target.value))} type="text"/>
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s12">
                    <input value={passwordOne} name="password" onChange={event => this.setState(byPropKey('passwordOne', event.target.value))} type="password"/>
                    <label for="password">Password</label>
                </div>
                <div class="input-field col s12">
                    <input value={passwordTwo} name="passwordTwo" onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))} type="password"/>
                    <label for="email">Confirm Password</label>
                </div>
                { error && <p>{error.message}</p> }
                <div class="row col s12">
                    <button data-target="firstmodal" class="btn m-r-16 grey darken-3 modal-trigger">Government issued ID</button>
                 </div>
                 <div class="row col s12"> 
                    <button data-target="secondmodal" class="btn m-r-16 grey darken-3 modal-trigger">Additional Piece</button>
                </div>
                <div>
                    <p>
                        <label>
                            <input type="checkbox" name="checkbox" value={checkTerms} onChange={event => {this.setState(byPropKey('checkTerms', !this.state.checkTerms))}}/>
                                <span>I agree to the <a onClick={this.showTermsAndConditions}>terms and conditions</a></span>
                        </label>
                    </p>
                </div>

                <div id="firstmodal" className="modal">
                    <div class="modal-content">
                        <div className="jc-center valign-wrapper">
                            <p>Upload a piece of government issued ID </p>
                        </div>
                        <div class="file-field input-field">
                            <div class="btn m-r-16 grey darken-3">
                                <span>File</span>
                                <input type="file" name="file1" value={file1} onChange={event => {this.setState(byPropKey('file1', event.target.value))}}/>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="row col s12">
                            <button type="button" id="firstmodal" class="modal-action modal-close btn m-r-16 grey darken-3" disabled={isFile1Selected}> Continue </button>
                        </div>                       
                    </div>
                </div>

                <div id="secondmodal" class="modal">
                    <div class="modal-content">
                        <p>Complete <b>one</b> of the following two options.</p>
                        <ul class="collapsible">
                            <li>
                            <div class="collapsible-header">Prescription or Dispensary card</div>
                            <div class="collapsible-body">
                                <div class="file-field input-field">
                                    <p> Upload an image of a prescription or dispensary card.</p>
                                    <div class="btn m-r-16 grey darken-3">
                                        <span>File</span>
                                        <input type="file" name="file2" value={file2} onChange={event => {this.setState(byPropKey('file2', event.target.value))}}/>
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text"/>
                                    </div>
                                </div>
                            </div>
                            </li>
                            <li>
                            <div class="collapsible-header">Self Diagnoses</div>
                            <div class="collapsible-body">
                                <span> Select all that apply </span>
                                <p>
                                    <label>
                                        <input type="checkbox" name="reason1" value={reason1} onChange={event => {this.setState(byPropKey('reason1', !this.state.reason1))}} />
                                        <span>Reason 1</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox" name="reason2" value={reason2} onChange={event => {this.setState(byPropKey('reason2', !this.state.reason2))}}/>
                                        <span>Reason 2</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox" name="reason3" value={reason3} onChange={event => {this.setState(byPropKey('reason3', !this.state.reason3))}}  />
                                        <span>Reason 3</span>
                                    </label>
                                </p>
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <div class="row col s12">
                            <button type="button" id="secondmodal" class="modal-action modal-close btn m-r-16 grey darken-3" disabled={isSupportingDocumentCompleted}> Continue </button>
                        </div>                       
                    </div>
                </div>

                <div id="termAndconditionModal" className="modal">
                    <div class="modal-content">      
                        <button type="button" id="thirdmodal" class="modal-action modal-close btn m-r-16 grey darken-3" > x </button>               
                        <div className="jc-center valign-wrapper">
                            <h3>Terms and Conditions </h3>
                        </div>
                        <div>
                            <p> 
                                Lorem Ipsum has been the industry's standard dummy text ever 
                            since the 1500s, when an unknown printer took a galley of type and scrambled
                             it to make a type specimen book. It has survived not only five centuries, but 
                             also the leap into electronic typesetting, remaining essentially unchanged. It 
                             was popularised in the 1960s with the release of Letraset sheets containing
                              Lorem Ipsum passages, and more recently with desktop publishing software like
                               Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <p>
                                 Where does it come from?
                               Contrary to popular belief, Lorem Ipsum is not simply random text.
                                It has roots in a piece of classical Latin literature from 45 BC,
                                 making it over 2000 years old. Richard McClintock, a Latin professor at
                                 Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
                                 words, consectetur, from a Lorem Ipsum passage, and going through the cites
                                 of the word in classical literature, discovered the undoubtable source. Lorem
                                     Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                      (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                                       on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
                                     for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                                      Bonorum et Malorum" by Cicero are also reproduced in their exact 
                                      original form, accompanied by English versions from the 1914 translation
                                       by H. Rackham.
                            </p>
                            <p>
                               Where can I get some?
                                       There are many variations of passages of Lorem Ipsum available,
                                        but the majority have suffered alteration in some form, by 
                                        injected humour, or randomised words which don't look even 
                                        slightly believable. If you are going to use a passage of Lorem Ipsum,
                                         you need to be sure there isn't anything embarrassing hidden in the 
                                         middle of text. All the Lorem Ipsum generators on the Internet tend 
                                         to repeat predefined chunks as necessary, making this the first true 
                                         generator on the Internet. It uses a dictionary of over 200 Latin 
                                         words, combined with a handful of model sentence structures, to 
                                         generate Lorem Ipsum which looks reasonable. The generated Lorem 
                                         Ipsum is therefore always free from repetition, injected humour, or 
                                         sxnon-characteristic words etc.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row col s12">
                    <button class="btn m-r-16 grey darken-3" disabled={isInvalid} type="submit">
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