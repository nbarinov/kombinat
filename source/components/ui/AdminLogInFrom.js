import { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import fetch from 'isomorphic-fetch';

import '../../style/login-form.css';

class AdminLogInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this._login = React.createRef();
        this._password = React.createRef();
    }

    onSubmit(e) {
        const { onLogIn } = this.props;
        this.setState({ error: null });

        e.preventDefault();

        const _login = this._login.current.value.trim();
        const _password = this._password.current.value.trim();

        if (validator.isEmpty(_login)) {
            return this.setState({
                error: 'Введите логин',
            });
        }

        if (validator.isEmpty(_password)) {
            return this.setState({
                error: 'Введите пароль',
            });
        }

        fetch(`/api/admin/login/?login=${encodeURIComponent(_login)}&password=${encodeURIComponent(_password)}`)
            .then(response => response.json())
            .then(data => data[0])
            .then(user => {
                if(user) {
                    onLogIn(user);
                } else {
                    this.setState({
                        error: 'Пользователь не найден'
                    });
                }
            })
    }

    render() {
        const { className } = this.props;

        return (
            <form className={(className) ? `${className} login-form` : 'login-form'} onSubmit={this.onSubmit}>
                <header className="login-form__header">
                    <h2 className="login-form__title">Вход в панель администратора</h2>
                </header>
                <div className="login-form__field">
                    <input type="text" className="login-form__input input" ref={this._login} name="login" placeholder="Логин" required />
                </div>
                <div className="login-form__field">
                    <input type="password" className="login-form__input input" ref={this._password} name="password" placeholder="Пароль" required />
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

AdminLogInForm.propTypes = {
    className: PropTypes.string,
    onLogIn: PropTypes.func,
};

export default AdminLogInForm;