import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

import { Provider } from 'react-redux';
import { compose } from 'redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import api from './kombinat-api';

import App from '../components/App';
import storeFactory from '../store';
import initialState from '../store/initialState.json';

const fileAssets = express.static(path.join(__dirname, '../../dist/assets'));
const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'));
const serverStore =  storeFactory(true, initialState);

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
};

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore;
    next();
};

const makeClientStoreFrom = store => url => ({
    store: storeFactory(true, store.getState()),
    url
});

const renderComponentToHTML = ({ url, store }) => ({
    html: renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={{}}>
                <App />
            </StaticRouter>
        </Provider>
    )
});

const buildHTMLPage = ({ html }) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Комбинат школьного питания</title>
            <style>${staticCSS}</style>
        </head>
        <body>
            <div id="react-container">${html}</div>
            <script src="/bundle.js"></script>
        </body>
    </html>
`;

const htmlResponse = compose(
    buildHTMLPage,
    renderComponentToHTML,
    makeClientStoreFrom(serverStore)
);

const respond = (req, res) => res.status(200).send(htmlResponse(req.url));

export default express()
    .use(logger)
    .use(fileAssets)
    .use(bodyParser.json())
    .use(addStoreToRequestPipeline)
    .use('/api', api)
    .use(respond);