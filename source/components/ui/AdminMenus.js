import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import fetch from 'isomorphic-fetch';
import { dateFormatDote } from '../../libs/date-helper';

const AdminMenus = ({ history, alert }) => {
    const viewMenu = menu => {
        history.push(`/admin/menus/view/${menu.id}`);
    };

    const deleteMenu = menu => {
        const toDelete = confirm(`Удалить меню от ${dateFormatDote(menu.dateCreate)}?`);

        if (toDelete) {
            fetch(`/api/menus/delete/${menu.id}`, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(result => {
                    if (result.affectedRows > 0) {
                        alert.success('Меню удалено');
                    } else {
                        alert.alert('Меню не удалено');
                    }
                })
                .catch(e => alert.error(`Что-то пошло не так... ${e}`));
        }
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

    return <AdminContainer url="/api/menus/list" className="admin-container--pr0" search={true} commands={commands} />;
};

AdminMenus.propTypes = {
    history: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withAlert
)(AdminMenus);