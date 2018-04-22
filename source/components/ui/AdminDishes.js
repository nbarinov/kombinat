import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const Dishes = DataComponent(Table, '/api/dishes');

const AdminDishs = ({ className }) => {
    return (
        <section className={(className) ? `${className} admin-dishes` : 'admin-dishes'}>
            <Dishes className="admin-dishes__table" limit={limitPersonRows} />
        </section>
    );
};

AdminDishs.propTypes = {
    className: PropTypes.string,
};

export default AdminDishs;