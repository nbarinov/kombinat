import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import { compose } from 'redux';

import ProfileUI from './ui/Profile';
import CalendarUI from './ui/Calendar';
import MainMenuUI from './ui/MainMenu';
import AdminUI from './ui/Admin';

import { userLogIn, userLogOut, adminLogIn, calendarSetDate } from '../actions';

export const Profile = connect(
    ({ user, calendar }) => ({ user, calendar }),
    dispath => ({
        onLogIn(person) {
            dispath(userLogIn(person));
        },
    })
)(ProfileUI);

export const MainMenu = compose(
    withRouter,
    connect(
        ({ user }) => ({ user }),
        dispath => ({
            onLogOut() {
                dispath(userLogOut());
            },
        })
    )
)(MainMenuUI);

export const Admin = connect(
    ({ admin }) => ({ admin }),
    dispath => ({
        onLogIn(user) {
            dispath(adminLogIn(user));
        }
    })
)(AdminUI);

export const Calendar = connect(
    ({ calendar }) => ({ calendar }),
    dispath => ({
        setDate(date) {
            dispath(calendarSetDate(date));
        },
    })
)(CalendarUI);