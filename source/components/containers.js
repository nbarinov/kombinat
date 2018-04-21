import { connect } from 'react-redux';

import ProfileUI from './ui/Profile';

import { userLogIn, userLogOut } from '../actions';

export const Profile = connect(
    ({ user }) => ({ user }),
    dispath => ({
        onLogIn(person) {
            dispath(userLogIn(person));
        },
        onLogOut() {
            dispath(userLogOut());
        }
    })
)(ProfileUI);