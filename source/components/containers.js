import { connect } from 'react-redux';

import ProfileUI from './ui/Profile';

import { userLogIn, userLogOut } from '../actions';

export const Profile = connect(
    ({ user }) => ({ user }),
    dispath => ({
        onLogIn(id) {
            dispath(userLogIn(id));
        },
        onLogOut() {
            dispath(userLogOut());
        }
    })
)(ProfileUI);