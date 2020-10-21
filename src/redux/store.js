/**
 * redux 最核心的管理对象模块
 */
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

 export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))