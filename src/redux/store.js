import { configStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userListReducer from './userListSlice';
import chatReducer from './chatSlice';

 export default configStore({
    reducers: {
        user: userReducer,
        userList: userListReducer,
        chat: chatReducer
    }
})