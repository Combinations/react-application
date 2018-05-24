import React, { Component } from 'react';
import { 
    Link,
    withRouter,
} from 'react-router-dom';

import axios from 'axios';

import {signUp, login} from '../services/authenticationService';
import withAgeAuthorization from './withAgeAuthorization';
import ErrorToast from './ErrorToast';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import * as routes from '../constants/routes';

import Checkbox from './Checkbox';


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
    error: null,
    selectedCheckboxes: null,
    symptomSelected: false,
    symptoms: ['Seizure Disorders', 'Sleep Disorders', 'ADHA', 'AIDS/HIV', 'Anxiety/Stress Disorder', 'Arthritis', 'Asthma', 'Brain/Head Injury', 'Cancer Cerebral Palsy',
    'Chemotherapy Treatment', 'Chronic Pain', 'Colitis', 'Crohn’s Desease', 'Chronic Migraines', 'Depression', 'Eating Disorders', 'Eczema', 'Emphysema', 'End of life/Palliative Care', 
    'Epilepsy', 'Fibromyalgia', 'Glaucoma', 'Hepatitis C', 'Irritable Bowel Syndrome', 'Neuralgia', 'Paraplegia/Quadriplegia', 'Psoriasis', 'PTSD', 'Radiation Therapy','Parkinson’s Disease',
    'Lyme Disease', 'Multiple Sclerosis', 'Spinal Cord Injury', 'Substance Addiction/Withdrawal', 'Muscular Dystrophy', 'Nausea']
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

    this.state.selectedCheckboxes = new Set();
  }

  onSubmit = (event) => {
    
    const {
        username,
        email,
        passwordOne,
        checkTerms,
        file1,
        file2,
        selectedCheckboxes,
        symptomSelected
      } = this.state;

    const {
        history,
    } = this.props;

    const form = event.target;
    const data = new FormData(form);

    let selfDiagnoses = []
    for(const checkbox of this.state.selectedCheckboxes) {
        selfDiagnoses.push(checkbox);
    }
    data.append('selfDiagnoses', selfDiagnoses);

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

  toggleCheckbox = label => {
    if(this.state.selectedCheckboxes.has(label)) {
        this.state.selectedCheckboxes.delete(label);
    } else {
        this.state.selectedCheckboxes.add(label);
    }

    this.state.selectedCheckboxes.size === 0 ? this.setState(byPropKey('symptomSelected', false)) : this.setState(byPropKey('symptomSelected', true))
  }

  createCheckbox = label => (
      <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label}/>
  )

  createCheckboxes = () => (
      this.state.symptoms.map(this.createCheckbox)
  )

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        checkTerms,
        file1,
        file2,
        symptomSelected,
        error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      checkTerms === false ||
      file1 === '' ||
      (file2 === '' && symptomSelected === false)

    const isFile1Selected = 
        file1 === ''
    
    const isSupportingDocumentCompleted = 
        (file2 === '' && symptomSelected === false)

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
                { error && <ErrorToast error={error} clearError={(error) => this.setState(byPropKey('error', error))} /> }
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
                            <span>I agree to all terms and conditions</span>
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
                                <span> The following is a list of conditions which may be helped by medicinal cannabis. Please select all that apply. </span>
                                {this.createCheckboxes()}
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