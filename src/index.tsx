import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/index.scss';
import Router from './app/Router'
import { Provider } from 'react-redux'
import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
require('dotenv').config()

ReactDOM.render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <Router />
        </Provider>
    </PersistGate>,
    document.getElementById('root')
);
