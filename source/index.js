import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from '~/components/App'; 
import storeFactory from './store';
import initialState from './store/initialState.json';

const store = storeFactory(false, initialState);

window.React = React;
window.store = store;

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-container')
);