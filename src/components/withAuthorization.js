import React from 'react';
import { withRouter } from 'react-router-dom';

import {isAuthed} from '../services/authenticationService'
import * as routes from '../constants/routes';

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {

    componentWillMount() {
        if (!isAuthed()) {
            this.props.history.push(routes.SIGN_IN); //if not authed push the sign in page
        }
    }

    render() {
        return <Component/> //render if authenticated
    }
  }
  return withRouter(WithAuthorization);
}

export default withAuthorization;





