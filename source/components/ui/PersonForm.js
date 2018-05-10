import { Component } from 'react';
import DataComponent from '../HOC/DataComponent';
import Input from './Input';
import Select from './Select';
import { t } from '../../config';
import validator from 'validator';
import fetch from 'isomorphic-fetch';

import '../../style/person-form.css';
import '../../style/ui/button.css';

class PersonForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
        };

        this.refsArray = new Array();

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


        fetch('/api/person/save', {
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
                            value: 'Данные обновлены',
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
            });
    }

    render() {
        const { className, data } = this.props;
        const { message } = this.state;
        const { onSubmit } = this;

        if (data.length === 0) {
            return <h2>Ребенок не найден</h2>;
        }

        const person = data[0];
        const labels = Object.keys(person);
        const SelectSchools = DataComponent(Select, '/api/schools/list');

        return (
            <form className={(className) ? `${className} person-form` : 'person-form'} onSubmit={onSubmit}>
                <header className="person-form__header">
                    <h2 className="person-form__title">Редактор данных ребенка</h2>
                    {(message) ? <p className={`person-form__message person-form__message--${message.type}`}>{message.value}</p> : ''}
                </header>
                {labels.map((label, index) =>
                    <div className="person-form__row" key={index}>
                        <label className="person-form__label">
                            {(label === 'account') ? '' : `${t[label]}:`}
                            {(label === 'schoolName') ?
                                <SelectSchools
                                    className="person-form__select"
                                    name="tin"
                                    valueProp="tin"
                                    titleProp="schoolName"
                                    selected={person[label]}
                                    onRef={input => this.refsArray.push(input)} /> :
                                <Input
                                    type={(label === 'account') ? 'hidden' : 'text'}
                                    className="person-form__input input"
                                    defaultValue={person[label]}
                                    name={label}
                                    placeholder={t[label]}
                                    ref={input => this.refsArray.push(input)} />}
                        </label>
                    </div>
                )}
                <div className="person-form__row">
                    <button className="person-form__button button button--primary">Сохранить</button>
                </div>
            </form>
        );
    }
}

export default PersonForm;

