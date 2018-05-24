import { Component } from 'react';
import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import Input from './Input';
import Select from './Select';
import validator from 'validator';
// import fetch from 'isomorphic-fetch';

import '../../style/person-form.css';
import '../../style/ui/button.css';

class PersonAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
        };

        this.refsArray = new Array();

        this.SelectSchools = DataComponent(Select, '/api/schools/list');

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        const { refsArray } = this;
        this.setState({ message: null });

        e.preventDefault();

        let body = '';
        for (let i = 0; i < refsArray.length; i++) {
            if (validator.isEmpty(refsArray[i].getCurrent().value)) {
                return this.setState({
                    message: {
                        type: 'error',
                        value: 'Заполните все поля',
                    }
                });
            }
            body += `${refsArray[i].getCurrent().name}=${refsArray[i].getCurrent().value.trim()}&`;
        }

        body = body.slice(0, body.length - 1);

        fetch('/api/person/add', {
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body,
        })
            .then(response => response.json())
            .then(result => {
                if (result.affectedRows > 0) {
                    this.setState({
                        message: {
                            type: 'success',
                            value: 'Ребенок добавлен',
                        }
                    });
                } else {
                    this.setState({
                        message: {
                            type: 'warning',
                            value: 'Произошла ошибка. Мы решаем эту проблему.',
                        }
                    });
                }
            })
            .catch(error => this.setState({
                message: {
                    type: 'warning',
                    value: `Произошла ошибка на сервере. Мы решаем эту проблему. Текст сообщения: ${error}`,
                }
            }));
    }

    render() {
        const { className } = this.props;
        const { message } = this.state;
        const { SelectSchools, onSubmit } = this;

        return (
            <form className={(className) ? `${className} person-form person-form--w560` : 'person-form person-form--w560'} onSubmit={onSubmit}>
                <header className="person-form__header">
                    <h2 className="person-form__title">Форма добавления ребенка</h2>
                    {(message) ? <p className={`person-form__message person-form__message--${message.type}`}>{message.value}</p> : ''}
                </header>
                <div className="person-form__row">
                    <label className="person-form__label">
                        Фамилия:
                        <Input
                            type="text"
                            className="person-form__input input"
                            name="lastName"
                            placeholder="Фамилия ребенка"
                            ref={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <label className="person-form__label">
                        Имя:
                        <Input
                            type="text"
                            className="person-form__input input"
                            name="firstName"
                            placeholder="Имя ребенка"
                            ref={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <label className="person-form__label">
                        Отчество:
                        <Input
                            type="text"
                            className="person-form__input input"
                            name="middleName"
                            placeholder="Отчество ребенка"
                            ref={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <label className="person-form__label">
                        ФИО родителя:
                        <Input
                            type="text"
                            className="person-form__input input"
                            name="parent"
                            placeholder="ФИО родителя"
                            ref={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <label className="person-form__label">
                        Школа:
                        <SelectSchools
                            className="person-form__select"
                            name="tin"
                            valueProp="tin"
                            titleProp="schoolName"
                            onRef={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <label className="person-form__label">
                        Баланс:
                        <Input
                            type="number"
                            className="person-form__input input"
                            name="balance"
                            defaultValue={0}
                            placeholder="Баланс"
                            ref={input => this.refsArray.push(input)} />
                    </label>
                </div>
                <div className="person-form__row">
                    <button className="person-form__button button button--primary">Добавить ребенка</button>
                </div>
            </form>
        );
    }
}

PersonAdd.propTypes = {
    className: PropTypes.string,
};

export default PersonAdd;