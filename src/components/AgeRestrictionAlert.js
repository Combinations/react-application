import React, {Component} from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

class AgeConfirmationAlert extends Component {
    
    componentDidMount() {
		const confirmedAge = localStorage.getItem('confirmedAge')
		const isAuthed = localStorage.getItem('authed')
		if(confirmedAge !== "true" && isAuthed !== "true") {
			const elem = document.querySelector('.modal');
			const instance = M.Modal.init(elem, {dismissible: false, endingTop: 40});
		}
	}

	confirmAge() {
		localStorage.setItem("confirmedAge", "true")
	}

	denyAge() {
		localStorage.setItem("confirmedAge", "false")
	}

    render() {
        return (
        <div data-testid='AgeRestrictionAlert' id="modal1" className="modal">
            <div className="modal-content">
                <h4>Age Confirmation</h4>
                <p>Are you over 19 years of age?</p>
            </div>
            <div className="modal-footer">
                <Link className="modal-action modal-close waves-effect btn-flat" to={routes.AGE_RESTRICTION} onClick={this.denyAge}>No</Link>
                <a href="#!" className="modal-action modal-close waves-effect btn-flat" onClick={this.confirmAge}>Yes</a>
            </div>
		</div>
        );
      }
    };

export default AgeConfirmationAlert;
