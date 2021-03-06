import PropTypes from 'prop-types';
import { t } from '../../config';
import { dateFormatDote } from '../../libs/date-helper';

import '../../style/ui/table.css';

const TableVerical = ({ className, data: initialData }) => {
    const data = Array.isArray(initialData) ? initialData[0] : initialData;
    const headers = Object.keys(data || {});

    return (
        <div className="table-container">
            {(initialData.length === 0) ?
                <p className="table-container__p table-container__p--italic table-container__p--center">Данные отсутствуют</p> :
                <table className={(className) ? `${className} table` : 'table'}>
                    {headers.map((head, row) =>
                        <tr key={row} className="table__tr">
                            <th className="table__th table__th--vertical">{t[head]}</th>
                            <td className={`table__td table__td--vertical table__td--${head}`}>
                                {(head.includes('date')) ? dateFormatDote(data[head]) : data[head]}
                            </td>
                        </tr>
                    )}
                </table>}
        </div>
    );
};

TableVerical.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
};

TableVerical.defaultProps = {
    className: '',
};

export default TableVerical;