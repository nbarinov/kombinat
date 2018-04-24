import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import fetch from 'isomorphic-fetch';

const AdminMenus = ({ className, history, alert }) => {
    const viewMenu = menu => {
        history.push(`/admin/menus/view/${menu.id}`);
    };

    const deleteMenu = menu => {
        // const toDelete = confirm(`Удалить ${person.lastName} ${person.firstName} ${person.middleName}?`);

        // if (toDelete) {
        //     fetch(`/api/persons/delete/${person.account}`, {
        //         method: 'delete',
        //     })
        //         .then(response => response.json())
        //         .then(result => {
        //             if (result.affectedRows > 0) {
        //                 alert.success('Ребенок удален');
        //             } else {
        //                 alert.alert('Ребенок не удален');
        //             }
        //         })
        //         .catch(e => alert.error(`Что-то пошло не так... ${e}`));
        // }
    };

    const commands = [
        {
            name: 'view',
            func: viewMenu,
        },
        {
            name: 'delete',
            func: deleteMenu,
        },
    ];

    return <AdminContainer url="/api/menus/list" className={className} search={true} commands={commands} />;
};

AdminMenus.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withAlert
)(AdminMenus);