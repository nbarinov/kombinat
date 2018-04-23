import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { withRouter } from 'react-router-dom';

const AdminPersons = ({ history }) => {
    const viewPerson = (person) => {
        history.push(`/admin/person/view/${person.account}`);
    };

    const commands = [
        {
            name: 'view',
            func: viewPerson,
        },
        {
            name: 'edit',
            func: f => f,
        },
        {
            name: 'delete',
            func: f => f,
        },
    ];

    return <AdminContainer url="/api/persons/list" search={true} commands={commands} />;
};

AdminPersons.propTypes = {
    className: PropTypes.string,
};

export default withRouter(AdminPersons);