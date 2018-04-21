import { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import '../../style/login-form.css';

class LogInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this._account = React.createRef();
        this._lname = React.createRef();
    }

    onSubmit(e) {
        const { onLogIn } = this.props;
        this.setState({error: null});

        e.preventDefault();

        const _account = this._account.current.value.trim();
        const _lname = this._lname.current.value.trim();

        if (validator.isEmpty(_lname)) {
            return this.setState({
                error: 'Поле "Фамилия" не может быть пустым',
            });
        }

        if (validator.isEmpty(_account)) {
            return this.setState({
                error: 'Поле "Номер лицевого счета" не может быть пустым',
            });
        }

        if (!validator.isNumeric(_account)) {
            return this.setState({
                error: 'Номер лицевого счета состоит только из цифр',
            });
        }

        fetch(`/api/person/find/?account=${encodeURIComponent(_account)}&lname=${encodeURIComponent(_lname)}`)
            .then(response => response.json())
            .then(data => data[0])
            .then(person => {
                if (person) {
                    onLogIn(person);
                } else {
                    this.setState({
                        error: 'Ребнок не найден'
                    });
                }
            });
    }

    render() {
        const { className } = this.props;

        return (
            <form className={(className) ? `${className} login-form` : 'login-form'} onSubmit={this.onSubmit}>
                <header className="login-form__header">
                    <h2 className="login-form__title">Вход в Личный кабинет</h2>
                </header>
                <div className="login-form__field">
                    <input type="text" className="login-form__input input" ref={this._lname} name="lname" placeholder="Фамилия" required />
                </div>
                <div className="login-form__field">
                    <input type="text" className="login-form__input input" ref={this._account} name="account" placeholder="Номер лицевого счета" required />
                </div>
                <div className="login-form__field">
                    <button className="login-form__button button button--primary">Войти</button>
                </div>
                <footer className="login-form__footer">
                    <p className="login-form__error">{this.state.error}</p>
                </footer>
            </form>
        );
    }
}
LogInForm.propTypes = {
    className: PropTypes.string,
    onLogIn: PropTypes.func.isRequired,
};

export default LogInForm;