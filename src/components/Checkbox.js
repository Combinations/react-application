import React, {Component, PropTypes} from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

class Checkbox extends Component {
    state = {
        isChecked: false,
    }

    toggleCheckboxChange = () => {
        const {handleCheckboxChange, label} = this.props;

        this.setState(({isChecked}) => ({
            isChecked: !isChecked,
        }));

        handleCheckboxChange(label);
    }

    render() {
        const {label} = this.props;
        const {isChecked} = this.state;

        return (
            <p>
                <label>
                    <input type="checkbox" value={label} checked={isChecked} onChange={this.toggleCheckboxChange}/>
                    <span>{label}</span>
                </label>
            </p>
            )
    }
}

export default Checkbox;