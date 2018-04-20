import C from '../constants';

export const user = (state = false, action = { type: null }) => {
    switch(action.type) {
        case C.USER_LOG_IN:
            return true;
        case C.USER_LOG_OUT:
            return false;
        default:
            return state;
    }
};

export const admin = (state = false, action = { type: null }) => {
    switch (action.type) {
        case C.ADMIN_LOG_IN:
            return true;
        case C.ADMIN_LOG_OUT:
            return false;
        default:
            return state;
    }
};