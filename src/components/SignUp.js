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
    M.Modal.init(elem, {});

    const elem2 = document.getElementById('secondmodal');
    M.Modal.init(elem2, {});

    const elem3 = document.querySelector('.collapsible');
    M.Collapsible.init(elem3, {});

    const elem4 = document.getElementById('termAndConditionModal');
    M.Modal.init(elem4, {});
    
    this.setState(byPropKey('selectedCheckboxes', new Set()));
  }

  showTermsAndConditions() { 
    const elem = document.getElementById('termAndConditionModal');
    const instance = M.Modal.getInstance(elem, {});
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
                    <button data-target="firstmodal" className="btn m-r-16 grey darken-3 modal-trigger">Government issued ID</button>
                 </div>
                 <div className="row col s12"> 
                    <button data-target="secondmodal" className="btn m-r-16 grey darken-3 modal-trigger">Additional Piece</button>
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
                            <button type="button" id="firstmodal" className="modal-action modal-close btn m-r-16 grey darken-3" disabled={isFile1Selected}> Continue </button>
                        </div>                       
                    </div>
                </div>

                <div id="secondmodal" className="modal">
                    <div className="modal-content">
                        <p>Complete <b>one</b> of the following two options.</p>
                        <ul className="collapsible">
                            <li>
                            <div className="collapsible-header">Prescription or Dispensary card</div>
                            <div className="collapsible-body">
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
                            </li>
                            <li>
                            <div className="collapsible-header">Self Diagnoses</div>
                            <div className="collapsible-body">
                                <span> The following is a list of conditions which may be helped by medicinal cannabis. Please select all that apply. </span>
                                {this.createCheckboxes()}
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <div className="row col s12">
                            <button type="button" id="secondmodal" className="modal-action modal-close btn m-r-16 grey darken-3" disabled={isSupportingDocumentCompleted}> Continue </button>
                        </div>                       
                    </div>
                </div>

                <div id="termAndConditionModal" className="modal">
                    <div className="modal-content">      
                        <div className="jc-center valign-wrapper">
                            <h3>Terms and Conditions </h3>
                        </div>
                        <div>
                            <p> Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type and scrambled
                                it to make a type specimen book. It has survived not only five centuries, but 
                                also the leap into electronic typesetting, remaining essentially unchanged. It 
                                was popularised in the 1960s with the release of Letraset sheets containing
                                Lorem Ipsum passages, and more recently with desktop publishing software like
                                Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <p> Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text.
                                It has roots in a piece of classical Latin literature from 45 BC,
                                making it over 2000 years old. Richard McClintock, a Latin professor at
                                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
                                words, consectetur, from a Lorem Ipsum passage, and going through the cites
                                of the word in classical literature, discovered the undoubtable source. Lorem
                                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                                (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                                on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum
                                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
                                for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                                Bonorum et Malorum" by Cicero are also reproduced in their exact 
                                original form, accompanied by English versions from the 1914 translatio
                                by H. Rackham.
                            </p>
                            <p> Where can I get some?
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