import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { user, admin } from './reducers';

const clientLogger = store => next => action => {
    let result;

    console.groupCollapsed('dispatching', action.type);
    console.log('prev state', store.getState());
    console.log('action', action);

    result = next(action);

    console.log('next state', store.getState());
    console.groupEnd();

    localStorage['redux-store'] = JSON.stringify(store.getState());

    return result;
};

const serverLogger = store => next => action => {
    console.log('\n dispatching server action\n');
    console.log(action);
    console.log('\n');

    return next(action);
};

const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
];

const storeFactory = (server = false, initialState = {}) =>
    applyMiddleware(...middleware(server))(createStore)(
        combineReducers({ user, admin }),
        (!server) ?
            (localStorage['redux-store']) ? 
                JSON.parse(localStorage['redux-store']) :
                initialState :
            initialState
    );

export default storeFactory;