import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route,
} 
from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import StorePage from './Store';
import AccountPage from './Account';
import TrackPage from './Track';
import AgeRestrictionPage from './AgeRestriction'



import * as routes from '../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

render() {
  return (
    <Router>
      <div>
        <Navigation authUser={this.state.authUser} />

        <Route
          exact path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact path={routes.SIGN_UP}
          component={() => <SignUpPage />}
        />
        <Route
          exact path={routes.SIGN_IN}
          component={() => <SignInPage />}
        />
        <Route
          exact path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
        <Route
          exact path={routes.STORE}
          component={() => <StorePage />}
        />
        <Route
          exact path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
        <Route
          exact path={routes.TRACK}
          component={() => <TrackPage />}
        />
        <Route
          exact path={routes.AGE_RESTRICTION}
          component={() => <AgeRestrictionPage />}
        />
      </div>
    </Router>
    );
  }
} 

export default App;
