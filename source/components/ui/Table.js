import { Component } from 'react';
import PropTypes from 'prop-types';
import { t, limitTableRows } from '../../config';
import { dateFormatDote } from '../../libs/date-helper';

import '../../style/ui/table.css';

class Table extends Component {
    constructor(props) {
        super(props);

        const limit = this.props.limit || limitTableRows;
        const data = (this.props.data.length > limit) ? this.props.data.slice(0, limit) : this.props.data;
        this.headers = Object.keys(this.props.data[0] || {});

        this.state = {
            data,
            limit,
        };

        this.increase = this.increase.bind(this);
    }

    increase() {
        const limit = this.state.limit + 12;
        const data = this.props.data.slice(0, limit);

        this.setState({
            data,
            limit,
        });
    }

    render() {
        const { className } = this.props;
        const { data, limit } = this.state;
        const { headers, increase} = this;

        return (
            <div className="table-container">
                <table className={(className) ? `${className} table` : 'table'}>
                    <thead className="table__thead">
                        <tr className="table__tr">
                            {headers.map((item, i) => <th key={i} className={`table__th table__th--${item}`}>{t[item]}</th>)}
                        </tr>
                    </thead>
                    <tbody className="table__tbody">
                        {data.map((item, row) =>
                            <tr key={row} className="table__tr">
                                {headers.map((head, col) =>
                                    <td key={col} className={`table__td  table__td--${head}`}>
                                        {(head === 'date') ? dateFormatDote(item[head]) : item[head]}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                {(limit < this.props.data.length) ?
                    <p className="table-container__p table-container__p--center">
                        <button 
                            className="table-container__button" 
                            type="button"
                            onClick={increase}
                        >Показать еще...</button>
                    </p> :
                    ''}
            </div>
        );
    }
}

Table.propTypes = {
    className: PropTypes.string,
    limit: PropTypes.number,
    data: PropTypes.array.isRequired,
};

export default Table;