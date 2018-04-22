import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const Schools = DataComponent(Table, '/api/schools');

const AdminSchools = ({ className }) => {
    return (
        <section className={(className ? `${className} admin-schools` : 'admin-schools')}>
            <Schools className="admin-schools__table" limit={limitPersonRows} />
        </section>
    );
};

AdminSchools.propTypes = {
    className: PropTypes.string,
};

export default AdminSchools;