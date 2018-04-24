import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AdminSchools = ({ history }) => {
    const viewSchool = school => {
        history.push(`/admin/schools/view/${school.tin}`);
    };

    const commands = [
        {
            name: 'view',
            func: viewSchool,
        }
    ];

    return <AdminContainer url="/api/schools/list" search={true} commands={commands} />;
};

AdminSchools.propTypes = {
    history: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
};

export default compose(
    withRouter
)(AdminSchools);