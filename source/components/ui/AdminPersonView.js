import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import PersonView from './PersonView';

const AdminPersonView = ({ match }) => {
    const Person = DataComponent(PersonView, `/api/person/view/${match.params.account}`);

    return <Person />;
};

AdminPersonView.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminPersonView;
