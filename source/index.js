import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from '~/components/App'; 
import storeFactory from './store';
import initialState from './store/initialState.json';

const store = storeFactory(false, initialState);

window.React = React;
window.store = store;

const alertOptions = {
    position: 'bottom right',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

hydrate(
    <Provider store={store} template={AlertTemplate}>
        <BrowserRouter>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <App />
            </AlertProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-container')
);