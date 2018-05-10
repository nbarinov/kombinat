import { Component } from 'react'; 
import PropTypes from 'prop-types';

import '../../style/ui/input.css';

class Input extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();

        this.getCurrent = this.getCurrent.bind(this);
    }

    getCurrent() {
        return this.input.current;
    }

    render() {
        const { type, className, defaultValue, name, placeholder } = this.props;

        return <input
            type={type}
            className={(className) ? `${className} input` : 'input'}
            defaultValue={defaultValue}
            name={name}
            placeholder={placeholder}
            ref={this.input} />;
    }
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default Input;
