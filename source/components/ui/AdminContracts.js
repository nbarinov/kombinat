import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';

const AdminSchools = () => {
    return <AdminContainer url="/api/contracts/list" className="admin-container--w95 admin-container--pr0" search={true} />;
};

AdminSchools.propTypes = {
    history: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
};

export default AdminSchools;