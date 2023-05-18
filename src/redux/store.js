import { configStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';

 export default configStore({
    reducers: {
        user: userReducer,
        chat: chatReducer
    }
})