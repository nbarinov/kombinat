import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import PersonView from './PersonView';

const AdminPerson = ({ match }) => {
    const Person = DataComponent(PersonView, `/api/person/view/${match.params.account}`);

    return <Person />;
};

AdminPerson.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminPerson;
