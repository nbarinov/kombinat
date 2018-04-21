import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import { compose } from 'redux';

import ProfileUI from './ui/Profile';
import MainMenuUI from './ui/MainMenu';

import { userLogIn, userLogOut } from '../actions';

export const Profile = connect(
    ({ user }) => ({ user }),
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