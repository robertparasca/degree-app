import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'antd/dist/antd.css';

import App from './layout/App';

import './assets/scss/index.scss';

import store, { history } from './redux';

// TODO: Add React.StrictMode...

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
