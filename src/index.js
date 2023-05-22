/**
 * 入口js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store';
import routes from './router/index'

import { Provider } from 'react-redux';
import './assets/css/index.scss';
// import 'antd-mobile-v2/dist/antd-mobile.css';

// import './test/socketio_test'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter(routes)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);