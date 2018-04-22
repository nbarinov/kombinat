import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const AdminContainer = ({ className, url, search }) => {
    const DataTable = DataComponent(Table, url);

    return (
        <section className={(className) ? `${className} admin-container` : 'admin-container'}>
            <DataTable className="admin-container__table" limit={limitPersonRows} search={search} />
        </section>
    );
};

AdminContainer.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    search: PropTypes.bool,
};

AdminContainer.defaultProps = {
    className: '',
    search: false,
};

export default AdminContainer;