import PropTypes from 'prop-types';
import LogInForm from './LogInForm';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import { months } from '../../libs/date-helper';
import { Calendar } from '../containers';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import { zeroBegining } from '../../libs/date-helper';

import '../../style/profile.css';

const Profile = ({ className, user, onLogIn, calendar }) => {
    let PaymentTable = null;
    let RateTable = null;

    if(user) {
        PaymentTable = DataComponent(Table, `/api/person/payment/${user.account}`);
        RateTable = DataComponent(Table, `/api/person/rate/${user.account}`);

        if (user.history === undefined) {
            fetch(`/api/history/list/${user.account}`)
                .then(response => response.json())
                .then(history => onLogIn({
                    ...user,
                    history
                }));
        }
        
        if (user.menus === undefined) {
            fetch(`/api/menus/list/${user.tin_school}`)
                .then(response => response.json())
                .then(menus => onLogIn({
                    ...user,
                    menus
                }));
        }
    }

    return (!user) ?
        <LogInForm className="login-form--center" onLogIn={onLogIn} /> :
        <div className={(className) ? `${className} profile` : 'profile'}>
            <h1 className="profile__user-name">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
            <section className="profile__section">
                <h2 className="profile__title">Платежи</h2>
                <PaymentTable className="profile__payment" />
            </section>
            <section className="profile__section">
                <h2 className="profile__title">Расходы</h2>
                <RateTable className="profile__rate" />
            </section>
            <section className="profile__balance">
                <h2>{`Итого, ${(user.balance < 0) ? 'задолженность' : 'баланс'} на 1 ${months[new Date().getMonth()]}: ${user.balance}₽`}</h2>
            </section>
            <section className="profile__history">
                <h2 className="profile__title">Меню</h2>
                <div className="profile__wrapper">
                    <div className="profile__sidebar">
                        {(calendar.date === null) ?
                            <span>Выберите дату</span> :
                            <span>Меню на
                                <br />
                                <Link 
                                    to={`/menus/${user.tin_school}/${calendar.year}-${zeroBegining(calendar.month + 1)}-${zeroBegining(calendar.date)}`}>
                                    {calendar.date} {months[calendar.month]}</Link>
                            </span>}
                    </div>
                    <Calendar className="profile__calendar" menus={user.menus} history={user.history} />
                </div>
            </section>
        </div>;
};

Profile.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
    onLogIn: PropTypes.func.isRequired,
};

export default Profile;