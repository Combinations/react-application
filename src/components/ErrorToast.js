import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class ErrorToast extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.clearError is a callback that gets passed from the parent. This will clear the error in the parents state.
        M.toast({html: this.props.error.message, classes: 'red', completeCallback: this.props.clearError});  
    }

    render() {
        return (
        null
        )
    }
}

export default ErrorToast;
