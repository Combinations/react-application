import React, { Component } from 'react';
import withAgeAuthorization from './withAgeAuthorization';
import { Link } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";


class LandingFooter extends Component {

  render() {
    return (
        <footer data-testid='LandingFooter' className="page-footer grey darken-3">
          <div className="container">
                <div className="row center social">
                    <div className="col s3"><Link to="https://Facebook.com" target="_blank"><i><img src={require('../img/facebook-box.png')} alt="facebook social link"/></i></Link></div>
                    <div className="col s3"><Link to="https://Instagram.com" target="_blank"><i><img src={require('../img/instagram.png')} alt="instagram social link"/></i></Link></div>
                    <div className="col s3"><Link to="https://twitter.com" target="_blank"><i><img src={require('../img/twitter.png')} alt="twitter social link"/></i></Link></div>
                    <div className="col s3"><Link to="https://snapchat.com" target="_blank"><i><img src={require('../img/snapchat.png')} alt="snapchat social link"/></i></Link></div>
                </div>
          </div>
        
        <section id="footer" className="grey darken-3">
            <div className="container">
                <div className="row">
                <div className="col s12 center-align grey-text">
                © 2018 All Rights Reserved Terms of Use and Privacy Policy
                </div>
                </div>
            </div>
        </section>
      </footer>
    )
  }
}

export default withAgeAuthorization(LandingFooter);