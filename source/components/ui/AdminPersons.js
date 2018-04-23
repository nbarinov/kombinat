import { Component } from 'react';
import PropTypes from 'prop-types';
import AdminContainer from './AdminContainer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import fetch from 'isomorphic-fetch';

class AdminPersons extends Component {
    constructor(props) {
        super(props);

        this.viewPerson = this.viewPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);

        this.commands = [
            {
                name: 'view',
                func: this.viewPerson,
            },
            {
                name: 'edit',
                func: f => f,
            },
            {
                name: 'delete',
                func: this.deletePerson,
            },
        ];
    }

    viewPerson(person) {
        this.props.history.push(`/admin/persons/view/${person.account}`);
    }

    deletePerson(person) {
        const toDelete = confirm(`Удалить ${person.lastName} ${person.firstName} ${person.middleName}?`);

        if (toDelete) {
            fetch(`/api/persons/delete/${person.account}`, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(result => {
                    if (result.affectedRows > 0) {
                        this.props.alert.success('Ребенок удален');
                    } else {
                        this.props.alert.alert('Ребенок не удален');
                    }
                })
                .catch(e => this.props.alert.error(`Что-то пошло не так... ${e}`));
        }
    }

    render() {
        const { commands } = this;

        return <AdminContainer url="/api/persons/list" search={true} commands={commands} />;
    }
}

AdminPersons.propTypes = {
    className: PropTypes.string,
};

export default compose(
    withRouter,
    withAlert
)(AdminPersons);