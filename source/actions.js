import C from './constants';

const logIn = (type, id) => ({
    type,
    id,
    timestamp: new Date().toString(),
});

const logOut = (type) => ({ type });

export const userLogIn = (id) => logIn(C.USER_LOG_IN, id);
export const userLogOut = () => logOut(C.USER_LOG_OUT);

export const adminLogIn = (id) => logIn(C.ADMIN_LOG_IN, id);
export const adminLogOut = () => logOut(C.ADMIN_LOG_OUT);