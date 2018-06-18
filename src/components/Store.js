import React, { Component } from 'react';
import withAuthorization from './withAuthorization';

class StorePage extends Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
      <h1>Store Page</h1>
      <div className="carousel">

      </div>
  </div>
    )
  }
}

export default withAuthorization(StorePage);
