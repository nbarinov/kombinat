import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AdminLogInForm from './AdminLogInFrom';
import AdminMenu from './AdminMenu';
import AdminPersons from './AdminPersons';
import AdminSchools from './AdminSchools';

const Admin = ({ className, admin, onLogIn }) => {
    return (!admin) ?
        <AdminLogInForm className="login-form--center" onLogIn={onLogIn} /> :
        <section className={(className) ? `${className} admin` : 'admin'}>
            <AdminMenu className="admin__menu" />
            <Route exact path="/admin" render={() => <section>
                <h2>Здравствуйте, {admin.fname || admin.login}!</h2>
            </section>} />
            <Route path="/admin/persons" component={AdminPersons} />
            <Route path="/admin/schools" component={AdminSchools} />
        </section>;
};

Admin.propTypes = {
    className: PropTypes.string,
    admin: PropTypes.object,
    onLogIn: PropTypes.func,
};

export default Admin;

