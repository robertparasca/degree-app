import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'antd/dist/antd.css';

import App from './components/App';

import './assets/scss/index.scss';
import * as serviceWorker from './serviceWorker';
import store, { history } from './redux';

// TODO: Add React.StrictMode...

// TODO: DELETE THIS
// import { saveToken } from './utils/localStorageHelpers';
// saveToken('blah');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
