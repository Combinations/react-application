import React, { Component } from 'react';
import withAuthorization from './withAuthorization';


class TrackPage extends Component {

  render() {
    return (
      <div>
        <h1>Track Page</h1>
     </div>
    )
  }
}

export default withAuthorization(TrackPage);