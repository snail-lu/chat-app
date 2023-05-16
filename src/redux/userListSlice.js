import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: []
    },
    reducers: {        
        receiveUserList: (state, action) => {
            state.value = action.payload
        }
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { authSuccess, errorMsg, receiveUser, resetUser } = userSlice.actions

export default userSlice.reducer