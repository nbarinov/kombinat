import PropTypes from 'prop-types';
import { limitPersonRows } from '../../config';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const Menus = DataComponent(Table, '/api/menus');

const AdminMenus = ({ className }) => {
    return (
        <section className={(className) ? `${className} admin-menus` : 'admin-menus'}>
            <Menus className="admin-menus__table" limit={limitPersonRows} />
        </section>
    );
};

AdminMenus.propTypes = {
    className: PropTypes.string,
};

export default AdminMenus;