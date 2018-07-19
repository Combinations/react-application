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
				<section id="hero"  data-testid="hero" style={{ backgroundImage:  'url(' + require('../img/meadow.jpg') + ')'}}>
					<div className="container valign-wrapper jc-center">
						<div className="valign center-align white-text">
							<p className="flowtext hide-on-small-only">The modern dispensary </p>
							<h3> Browse, Select, Order, Track, Enjoy </h3>
							<p className="big">
								We produce your medicine using cutting edge biology, chemistry and software
								<br/>
								Order now and enjoy a truly superior experience
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
								<p>Browse hundreds of flowers, strains, concentrates and accessories from our constantly evolving offerings.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_two</i> Select</h5>
								<p>Select the items you want. Our intuitive user interface will guide you. It's simple, quick and easy.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_3</i> Order</h5>
								<p>Order your selected items through our secure checkout. Our checkout system uses industry standard encryption (HTTPS). </p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">looks_4</i> Track</h5>
								<p>Track your orders. We've built you an amazing tracker so that you'll be informed on the status of your order.</p>
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="container">
						<div className="row">
							<div className="col m6 offset-m3 center">
								<h2> Our Approach </h2>	
								<p>By utilizing modern biology, chemistry, and software we are able to optimize the seed-to-patient process. This enables us to bring you extremely high-quality product at reasonable costs.</p>
							</div>
						</div>
						<div className="row">
							<div className="col m3">
								<h5><i className="material-icons">group</i> Team</h5>
								<p>Our team consists of engineering, law, chemistry and botany professionals. We have experience in a range of industries. We are educated from academic insitutions from around the world. We work hard everyday in order to bring you high-quality medical grade cannabis.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">account_balance</i> Facilities</h5>
								<p>Our custom facilities have completely revolutionized the way natural medicinal cannabis is grown. Our facilities are built with a strong emphasis on automation. We use machine learning in order to care for each plant on an individual basis.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">build</i> Online</h5>
								<p>We are an online first dispensary. This allows us to avoid the costs of physical stores and to focus our efforts on improving the quality of our products and facilities.</p>
							</div>
							<div className="col m3">
								<h5><i className="material-icons">mood</i> Partnerships</h5>
								<p>We have great partnerships with government, academic insituitions, and hospitals. We are exicited to work with any organization that wishes to push forward the understanding of medicinal cannabis. </p>
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