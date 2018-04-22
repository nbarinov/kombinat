import { Component } from 'react';
import PropTypes from 'prop-types';
import { t, limitTableRows } from '../../config';
import { dateFormatDote } from '../../libs/date-helper';
import { arrayFilter } from '../../libs/array-helper';

import '../../style/ui/table.css';
import '../../style/ui/input.css';

class Table extends Component {
    constructor(props) {
        super(props);

        this.headers = Object.keys(this.props.data[0] || {});

        this.initialState = this.initialState.bind(this);
        this.increase = this.increase.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }
    
    initialState() {
        const limit = this.props.limit;
        const initialData = this.props.data;
        const data = (initialData.length > limit) ? initialData.slice(0, limit) : initialData;

        return {
            initialData,
            data,
            limit,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data.length !== nextState.data || this.state.limit !== nextState.limit;
    }

    increase() {
        const limit = this.state.limit + 12;
        const data = this.state.initialData.slice(0, limit);

        this.setState({
            data,
            limit,
        });
    }

    onChangeSearch(e) {
        const { limit } = this.state;
        const q = e.target.value.trim();

        if(q.length === 0) {
            return this.setState(this.initialState());
        }

        const initialData = arrayFilter(this.props.data, q);
        const data = initialData.slice(0, limit);

        this.setState({
            initialData,
            data,
        });
    }

    render() {
        const { className, search } = this.props;
        const { initialData, data, limit } = this.state;
        const { headers, increase, onChangeSearch } = this;

        return (
            <div className="table-container">
                {(search) ? 
                    <input type="text" name="q" className="table-container__search input" onChange={onChangeSearch} placeholder="Поиск по таблице..." /> : 
                    ''}
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
                                        {(head.includes('date')) ? dateFormatDote(item[head]) : item[head]}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                {(limit < initialData.length) ?
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
    search: PropTypes.bool,
};

Table.defaultProps = {
    className: '',
    limit: limitTableRows,
    search: false,
};

export default Table;