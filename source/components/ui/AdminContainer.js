import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const AdminContainer = ({ className, url }) => {
    const DataTable = DataComponent(Table, url);

    return (
        <section className={(className) ? `${className} admin-container` : 'admin-container'}>
            <DataTable className="admin-container__table" limit={limitPersonRows} />
        </section>
    );
};

AdminContainer.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
};

export default AdminContainer;