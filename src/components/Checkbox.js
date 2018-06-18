import React, {Component} from 'react';
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