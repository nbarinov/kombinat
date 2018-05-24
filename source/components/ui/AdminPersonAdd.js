import PropTypes from 'prop-types';
import PersonAdd from './PersonAdd';

const AdminPersonAdd = () => <PersonAdd />;

AdminPersonAdd.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminPersonAdd;
