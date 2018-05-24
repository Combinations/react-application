import React, {Component} from 'react';
import '../styles/styles.css';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import withAgeAuthorization from './withAgeAuthorization';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import LandingFooter from './LandingFooter';

class LandingPage extends Component {

  componentDidMount() {
    const confirmedAge = localStorage.getItem('confirmedAge')
    const isAuthed = localStorage.getItem('authed')
    if(confirmedAge !== "true" && isAuthed !== "true") {
      var elem = document.querySelector('.modal');
      var instance = M.Modal.init(elem, {dismissible: false, endingTop: 40});
      instance.open();
    }
  }

  confirmAge() {
    console.log("in confirmed age")
    localStorage.setItem("confirmedAge", "true")
  }

  denyAge() {
    console.log("deny age")
    localStorage.setItem("confirmedAge", "false")
  } 

  render() {
      return (
        <div>
          <div id="modal1" class="modal">
            <div class="modal-content">
              <h4>Age Confirmation</h4>
              <p>Are you over 19 years of age?</p>
            </div>
            <div class="modal-footer">
              <Link className="modal-action modal-close waves-effect btn-flat" to={routes.AGE_RESTRICTION} onClick={this.denyAge}>No</Link>
              <a href="#!" class="modal-action modal-close waves-effect btn-flat" onClick={this.confirmAge}>Yes</a>
            </div>
          </div>
          <section id="hero" style={{ backgroundImage:  'url(' + require('../img/meadow.jpg') + ')'}}>
            <div className="container valign-wrapper jc-center">
                <div className="valign center-align white-text">
                <p className="flowtext hide-on-small-only">The modern dispensary </p>
                <h3>
                    Browse, Select, Order, Track, Enjoy
                </h3>

                <p className="big">
                    We produce your medicine using cutting edge biology, chemistry and software
                    <br/>
                    Order now and enjoy a truly superior experience
                </p>

                <Link className="btn waves-light waves-effect m-r-16 grey darken-3" to={routes.SIGN_UP}>Sign up</Link>
                <Link className="btn waves-light waves-effect m-r-16 grey darken-3" to={routes.SIGN_IN}>Sign in</Link>
                </div>
            </div>
          </section>

          <section>
            <div className="container">
                <div className="row">
                <div className="col m3"></div>
                <div className="col m6 center-align">
                    <h2>How we do it</h2>
                    <p>By exploiting modern biology, chemistry, and software we are able to optimize the seed-to-patient process and deliever an unpreceedented patient experience.</p>
                </div>
                <div className="col m3"></div>
                </div>
                <div className="row">
                <div className="col m3">
                    <h5><i className="material-icons">group</i> Team</h5>
                    <p>By optimizingWe have hundreds of different buds, strains, and edibles</p>
                </div>
                <div className="col m3">
                    <h5><i className="material-icons">account_balance</i> Facilities</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                </div>
                <div className="col m3">
                    <h5><i className="material-icons">build</i> Online</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                </div>
                <div className="col m3">
                    <h5><i className="material-icons">mood</i> Partnerships</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore magna aliqua. Ut enim!</p>
                </div>
                </div>
            </div>
          </section>
        <LandingFooter/>
        </div>
      );
    }
  };

export default withAgeAuthorization(LandingPage);