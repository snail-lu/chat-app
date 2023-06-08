/**
 * 入口js
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store';
import routes from './router/index'

import { Provider } from 'react-redux';
import App from './App'
import './assets/css/index.scss';

// import './test/socketio_test'
const root = createRoot(document.getElementById('root'));
const router = createHashRouter(routes)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App>
                <RouterProvider router={router} />
            </App>
        </Provider>
    </React.StrictMode>
);