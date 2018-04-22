import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AdminLogInForm from './AdminLogInFrom';
import AdminMenu from './AdminMenu';
import AdminContainer from './AdminContainer';

import '../../style/admin.css';

const Admin = ({ className, admin, onLogIn }) => {
    return (!admin) ?
        <AdminLogInForm className="login-form--center" onLogIn={onLogIn} /> :
        <section className={(className) ? `${className} admin` : 'admin'}>
            <AdminMenu className="admin__menu" />
            <Route exact path="/admin" render={() => <section>
                <h2>Здравствуйте, {admin.fname || admin.login}!</h2>
            </section>} />
            <Route path="/admin/persons" component={() => <AdminContainer url="/api/persons" />} />
            <Route path="/admin/schools" component={() => <AdminContainer url="/api/schools" />} />
            <Route path="/admin/menus" component={() => <AdminContainer url="/api/menus" />} />
            <Route path="/admin/dishes" component={() => <AdminContainer url="/api/dishes" />} />
        </section>;
};

Admin.propTypes = {
    className: PropTypes.string,
    admin: PropTypes.object,
    onLogIn: PropTypes.func,
};

export default Admin;

