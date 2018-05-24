import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import fetch from 'isomorphic-fetch';

import '../../style/admin-persons.css';

const AdminPersons = ({ className, history, alert, admin }) => {
    const viewPerson = person => {
        history.push(`/admin/persons/view/${person.account}`);
    };

    const editPerson = person => {
        history.push(`/admin/persons/edit/${person.account}`);
    };

    const deletePerson = person => {
        const toDelete = confirm(`Удалить ${person.lastName} ${person.firstName} ${person.middleName}?`);

        if (toDelete) {
            fetch(`/api/persons/delete/${person.account}`, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(result => {
                    if (result.affectedRows > 0) {
                        alert.success('Ребенок удален');
                    } else {
                        alert.alert('Ребенок не удален');
                    }
                })
                .catch(e => alert.error(`Что-то пошло не так... ${e}`));
        }
    };

    let commands = [];

    switch (Number(admin.role)) {
        case 1:
            commands = [
                {
                    name: 'view',
                    func: viewPerson,
                },
                {
                    name: 'edit',
                    func: editPerson,
                },
                {
                    name: 'delete',
                    func: deletePerson,
                },
            ];
            break;
        default: 
            commands = [
                {
                    name: 'view',
                    func: viewPerson,
                },
            ];
    }

    return <section className={(className) ? `${className} admin-persons` : 'admin-persons'}>
        <AdminContainer url="/api/persons/list" className="admin-persons__container" search={true} commands={commands} />
        <Link to="/admin/persons/add" className="admin-persons__link">+ Добавить ребенка</Link>
    </section>;
};

AdminPersons.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withAlert
)(AdminPersons);