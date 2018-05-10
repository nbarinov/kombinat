import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import PersonForm from './PersonForm';

const AdminPersonView = ({ match }) => {
    const Person = DataComponent(PersonForm, `/api/person/edit/${match.params.account}`);

    return <Person />;
};

AdminPersonView.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminPersonView;
