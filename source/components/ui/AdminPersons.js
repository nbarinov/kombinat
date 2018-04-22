import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const Persons = DataComponent(Table, '/api/persons');

const AdminPersons = ({ className }) => {
    return (
        <section className={(className ? `${className} admin-persons` : 'admin-persons')}>
            <Persons className="admin-persons__table" limit={limitPersonRows} />
        </section>
    );
};

AdminPersons.propTypes = {
    className: PropTypes.string,
};

export default AdminPersons;