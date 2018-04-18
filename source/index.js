import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '~/components/App';

window.React = React;

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('react-container')
);