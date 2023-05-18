import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList } from '../api'

// 注册
export const register = createAsyncThunk('user/register', async({ username, password, password2, avatar }) => {
    if(!username || !password){
        return errorMsg('请输入用户名及密码')
    }else if(password!==password2){
        return errorMsg('两次密码输入不一致')
    }

    //发送注册的异步ajax请求
    const response = await reqRegister({ username, password, avatar });
    return response.data
})

// 登录
export const login = createAsyncThunk('user/login', async({ username, password }) => {
    if (!username) {
        return errorMsg('请输入用户名')
    }else if (!password) {
        return errorMsg('请输入密码')
    }

    const response = await reqLogin({ username, password });
    return response.data
})


//更新用户信息异步action
export const update = createAsyncThunk('user/update', async (user)=>{
    const response = await reqUpdateUser(user);
    return response.data
})

//获取用户信息异步action
export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await reqUser();
    return response.data
})

//获取用户列表异步action
export const getUserList = createAsyncThunk('userList/get', async () =>{
    const response = await reqUserList();
    return response.data
})


const initialState = {
    userInfo: {
        username: '', // 用户名
        msg: '',
        avatar: '', // 头像
        redirecTo: ''
    },
    list: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authSuccess: (state, action) => {
            state.userInfo = { ...action.payload, redirecTo: '/friends' }
        },

        errorMsg: (state, action) => {
            state.userInfo.msg = action.payload
        },
        
        receiveUser: (state, action) => {
            state.userInfo = action.payload
        },

        resetUser: (state, action) => {
            state.userInfo = {
                username: '',
                msg: action.payload,
                avatar: '',
                redirecTo: ''
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(register.fulfilled, (state, action) => {
                const result = action.payload;
                if(result.code===200){
                    //成功,获取相关聊天信息列表
                    // getMsgList(dispatch,result.result._id);
                    //分发授权成功的action
                    state.userInfo = { ...result.result, redirecTo: '/friends' }
                }else{
                    //失败
                    //分发错误提示信息的同步action
                    // dispatch(errorMsg(result.message));
                    state.userInfo.msg = result.result.message;
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                const result = action.payload;
                if(result.code===200){
                    //分发授权成功的action
                    state.userInfo = { ...result.result, redirecTo: '/friends' }
                }else{
                    //失败
                    //分发错误提示信息的同步action
                    // dispatch(errorMsg(result.message));
                    state.userInfo.msg = result.result.message;
                }
            })
            .addCase(update.fulfilled, (state, action) => {
                const result = action.payload;
                if(result.code === 200){  //更新成功：data
                    state.userInfo = result.result
                }else{                //更新失败：msg
                    state.userInfo = {
                        username: '',
                        msg: result.result,
                        avatar: '',
                        redirecTo: ''
                    }
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const result = action.payload;
                if(result.code === 200){  //获取成功：data
                    // getMsgList(dispatch, result.result._id);
                    // dispatch(receiveUser(result.result))
                    state.userInfo = result.result;
                }else{                //获取失败：msg
                    state.userInfo = {
                        username: '',
                        msg: result.result,
                        avatar: '',
                        redirecTo: ''
                    }
                }
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                const result = action.payload;
                if (result.code === 200) {
                    state.list = result.result
                }
            })
        }
    }
)
// 每个 case reducer 函数会生成对应的 Action creators
export const { authSuccess, errorMsg, receiveUser, resetUser } = userSlice.actions

export default userSlice.reducer