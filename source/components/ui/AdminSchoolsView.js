import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import SchoolView from './SchoolView';

const AdminPersonView = ({ match }) => {
    const School = DataComponent(SchoolView, `/api/schools/view/${match.params.tin}`);

    return <School />;
};

AdminPersonView.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminPersonView;
