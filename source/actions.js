import C from './constants';

const logIn = (type, user) => ({
    type,
    user,
    timestamp: new Date().toString(),
});

const logOut = (type) => ({ type });

export const userLogIn = (user) => logIn(C.USER_LOG_IN, user);
export const userLogOut = () => logOut(C.USER_LOG_OUT);

export const adminLogIn = (user) => logIn(C.ADMIN_LOG_IN, user);
export const adminLogOut = () => logOut(C.ADMIN_LOG_OUT);

export const calendarSetDate = (date) => ({
    type: C.CALENDAR_SET_DATE,
    date,
});