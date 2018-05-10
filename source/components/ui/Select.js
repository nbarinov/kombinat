import { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    constructor(props) {
        super(props);

        this.select = React.createRef();

        this.getCurrent = this.getCurrent.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    getCurrent() {
        return this.select.current;
    }

    render() {
        const { className, name, data, valueProp, titleProp, selected } = this.props;

        return <select 
            className={(className) ? `${className} select` : 'select'} 
            name={name} 
            defaultValue={selected} 
            ref={this.select}>
            {data.map((item, index) =>
                <option
                    value={item[valueProp]}
                    key={index}>
                    {item[titleProp]}
                </option>
            )}
        </select>;
    }
}

Select.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueProp: PropTypes.string.isRequired,
    titleProp: PropTypes.string.isRequired,
    selected: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default Select;
