import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import {isAuthed} from '../services/authenticationService';

import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

const NavigationNonAuth = () =>
<div>
  <div className="navbar-fixed">
    <nav className="grey darken-3">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo left">Logo</a>
        <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><Link to={routes.SIGN_UP}>SIGN UP</Link></li>
          <li><Link to={routes.SIGN_IN}>SIGN IN</Link></li>
        </ul>
      </div>
    </nav>
  </div>

  <ul className="sidenav" id="mobile-demo">
    <li className="sidenav-close"><Link to={routes.SIGN_UP}><i className="material-icons">arrow_forward</i>SIGN UP</Link></li>
    <li className="sidenav-close"><Link to={routes.SIGN_IN}><i className="material-icons">arrow_forward</i>SIGN IN</Link></li>
  </ul>
</div>

const NavigationAuth = () =>
  <div>
    <div className="navbar-fixed">
      <nav className="grey darken-3">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">Logo</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to={routes.STORE}><i className="material-icons"><img src={require('../img/theone.png')} alt="leaf"/></i></Link></li>
            <li><Link to={routes.TRACK}><i className="material-icons" >local_shipping</i></Link></li>
            <li><Link to={routes.ACCOUNT}><i className="material-icons">person</i></Link></li>
          </ul>
        </div>
      </nav>
    </div>

    <ul className="sidenav" id="mobile-demo">
      <li className="sidenav-close"><Link to={routes.STORE}><i className="material-icons"><img src={require('../img/theone.png')} alt="leaf"/></i>Store</Link></li>
      <li className="sidenav-close"><Link to={routes.TRACK}><i className="material-icons">local_shipping</i>Track</Link></li>
      <li className="sidenav-close"><Link to={routes.ACCOUNT}><i className="material-icons">person</i>Account</Link></li>
    </ul>
  </div>

class Navigation extends Component {

  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "right",
      inDuration: 375,
      outDuration: 375
  });
  }

  componentDidUpdate() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "right",
      inDuration: 375,
      outDuration: 375
    });
  }
  
  render() {
    return (
      <div>
      { isAuthed()
          ?  <NavigationAuth />
          :  <NavigationNonAuth />
      }
      </div>
    );
  }
};

export default Navigation;
