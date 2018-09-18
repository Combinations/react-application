import React, {Component} from 'react';
import '../styles/styles.css';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import withAgeAuthorization from './withAgeAuthorization';
import "materialize-css/dist/css/materialize.min.css";
import LandingFooter from './LandingFooter';
import AgeRestrictionAlert from './AgeRestrictionAlert';

class LandingPage extends Component {

	render() {
		return (
			<div>
				<AgeRestrictionAlert/>
				<section id="hero"  data-testid="hero" style={{ backgroundImage:  'url(' + require('../img/background.jpg') + ')'}}>
					<div className="container valign-wrapper jc-center">
						<div className="valign center-align white-text">
							<p className="flowtext hide-on-small-only">Lorem ipsum dolor</p>
							<h3> Browse, Select, Order, Track, Enjoy </h3>
							<p className="big">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
								<br/>
								Lorem ipsum dolor sit amet
							</p>
							<Link className="btn m-r-16 grey darken-3" to={routes.SIGN_UP}>Sign up</Link>
							<Link className="btn m-r-16 grey darken-3" to={routes.SIGN_IN}>Sign in</Link>
						</div>
					</div>
				</section>

				<section className="grey lighten-3">
					<div className="container">
						<div className="col m6 center-align">
							<h2>How it works</h2>
						</div>
						<div className="row">
							<div className="col m3">
								<h5><i className="material-icons">looks_one</i> Browse</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_two</i> Select</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  quis nostrud exercitation </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_3</i> Order</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_4</i> Track</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  quis nostrud exercitation </p>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="container">
						<div className="row">
							<div className="col m6 offset-m3 center">
								<h2> Our Approach </h2>	
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
							</div>
						</div>
						<div className="row">
							<div className="col m3">
								<h5><i className="material-icons">group</i> Team</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">account_balance</i> Facilities</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">build</i> Online</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">mood</i> Partnerships</h5>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation  </p>
							</div>
						</div>
					</div>
				</section>

				<section className="grey lighten-3">
					<div className="container valign-wrapper jc-center">
						<div className="valign center-align">
							<h2> Ready to get started? </h2>
							<p className="big"> Sign in to browse, or sign up to create an account </p>
							<Link className="btn m-r-16 grey darken-3" to={routes.SIGN_UP}>Sign up</Link>
							<Link className="btn m-r-16 grey darken-3" to={routes.SIGN_IN}>Sign in</Link>
						</div>
					</div>
				</section> 
				<LandingFooter/>
			</div>
		);
	}
};

export default withAgeAuthorization(LandingPage);