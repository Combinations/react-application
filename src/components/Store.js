import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


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
