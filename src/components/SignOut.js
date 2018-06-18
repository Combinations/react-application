import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {signOut} from '../services/authenticationService'

class SignOutButton extends Component {
    handleClick = () => {
        signOut().then((success) => {
            this.props.history.push("/");
        })
    }

    render() {
        return (
           <div className="row col s12 container">
                <button className="btn m-r-16 red darken-3" onClick={this.handleClick} label="Sign out">Sign out</button>
            </div>
        );
      }
    };

export default withRouter(SignOutButton);
