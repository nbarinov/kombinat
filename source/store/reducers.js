import C from '../constants';

export const user = (state = null, action) => {
    switch(action.type) {
        case C.USER_LOG_IN:
            return {
                ...action.user,
                timestamp: action.timestamp
            };
        case C.USER_LOG_OUT:
            return null;
        default:
            return state;
    }
};

export const admin = (state = null, action) => {
    switch (action.type) {
        case C.ADMIN_LOG_IN:
            return {
                ...action.user,
                timestamp: action.timestamp
            };
        case C.ADMIN_LOG_OUT:
            return null;
        default:
            return state;
    }
};