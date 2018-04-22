import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AdminLogInForm from './AdminLogInFrom';
import DataComponent from '../HOC/DataComponent';
import List from './List';

const AdminPersons = DataComponent(List, '/api/persons');

const Admin = ({ className, admin, onLogIn }) => {
    return (!admin) ?
        <AdminLogInForm className="login-form--center" onLogIn={onLogIn} /> :
        <section className={className}>
            <Route exact path="/admin" render={() => <section>
                <h2>Здравствуйте, {admin.fname || admin.login}!</h2>
            </section>} />
            <Route path="/admin/persons" component={AdminPersons} />
        </section>;
};

Admin.propTypes = {
    className: PropTypes.string,
    admin: PropTypes.object,
    onLogIn: PropTypes.func,
};

export default Admin;

