import React from 'react';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const withAgeAuthorization = (Component) => {
  class withAgeAuthorization extends React.Component {

    componentWillMount() {
        if ((localStorage.getItem("confirmedAge") === "false")) {
            this.props.history.push(routes.AGE_RESTRICTION); //if not authed push the sign in page
        }
    }

    render() {
        return <Component /> //render if authenticated
    }
  }
  return withRouter(withAgeAuthorization);
}

export default withAgeAuthorization;

