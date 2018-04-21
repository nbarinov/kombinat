import PropTypes from 'prop-types';
import LogInForm from './LogInForm';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import { months } from '../../libs/date-helper';

import '../../style/profile.css';

const Profile = ({ className, user, onLogIn, onLogOut }) => {
    let PaymentTable = null;
    let RateTable = null;

    if(user) {
        PaymentTable = DataComponent(Table, `/api/person/payment/${user.account}`);
        RateTable = DataComponent(Table, `/api/person/rate/${user.account}`);
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
            <button onClick={onLogOut}>Log Out</button>
        </div>;
};

Profile.propTypes = {
    className: PropTypes.string,
    // user: PropTypes.oneOfType([null, PropTypes.object]).isRequired,
    onLogIn: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Profile;