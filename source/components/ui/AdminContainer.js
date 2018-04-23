import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const AdminContainer = ({ className, url, search, commands }) => {
    const DataTable = DataComponent(Table, url);

    return (
        <section className={(className) ? `${className} admin-container` : 'admin-container'}>
            <DataTable 
                className="admin-container__table" 
                limit={limitPersonRows} 
                search={search} 
                commands={commands} />
        </section>
    );
};

AdminContainer.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    search: PropTypes.bool,
    commands: PropTypes.arrayOf(PropTypes.object),
};

AdminContainer.defaultProps = {
    className: '',
    search: false,
    commands: [],
};

export default AdminContainer;