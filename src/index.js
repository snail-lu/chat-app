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
import 'antd-mobile-v2/dist/antd-mobile.css';

// import './test/socketio_test'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter(routes)
root.render(
    <Provider store={store}>
        {/* <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Main}></Route>
            </Switch>
        </HashRouter> */}
        <RouterProvider router={router} />
    </Provider>

);