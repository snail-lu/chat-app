/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList,reqChatList,reqReadMsg} from '../api'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST, RECEIVE_MSG,MSG_READ} from './action-types'
import io from 'socket.io-client'

//授权成功的同步action
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user})

//错误提示信息的同步action
const errorMsg = (msg) =>({type:ERROR_MSG,msg})

//接收用户的同步action
const receiveUser = (user)=>({type:RECEIVE_USER,data:user})

//重置用户的同步action
export const resetUser = (msg)=>({type:RESET_USER,data:msg})

//接收用户的同步action
export const receiveUserList = (users)=>({type:RECEIVE_USER_LIST,data:users})

//接收消息列表的同步action
export const receiveMsgList = ({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})

//接收一个消息的同步action
const receiveMsg = ({chatMsg,userid})=>({type:RECEIVE_MSG,data: {chatMsg,userid}})

//读取某个消息的同步action
const msgRead = ({count,from,to})=>({type:MSG_READ,data:{count,from,to}})

//异步获取消息列表函数
async function getMsgList(dispatch,userid){
    initIO(dispatch,userid)
    const response = await reqChatList()
    const result = response.data;
    if(result.code===0){
        const {users,chatMsgs} = result.data;
        //分发同步action
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}
//注册异步action
export const register = ({username,password,password2,type})=>{
    if(!username || !password){
        return errorMsg('请输入用户名及密码')
    }else if(password!==password2){
        return errorMsg('两次密码输入不一致')
    }
    
    return async dispatch =>{
        //发送注册的异步ajax请求
        const response = await reqRegister({username,password,type});
        const result = response.data
        if(result.code===0){
            //成功,获取相关聊天信息列表
            getMsgList(dispatch,result.data._id);
            //分发授权成功的action
            dispatch(authSuccess(result.data));
        }else{
            //失败
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    }
}

//登录异步action
export const login = (user)=>{
    const {username,password} = user;
    if(!username){
        return errorMsg('请输入用户名')
    }else if(!password){
        return errorMsg('请输入密码')
    }

    return async dispatch =>{
        //发送注册的异步ajax请求
        const response = await reqLogin(user);
        const result = response.data
        if(result.code===0){
            //成功'
            getMsgList(dispatch,result.data._id);
            //分发授权成功的action
            dispatch(authSuccess(result.data));
        }else{
            //失败
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    }
}

//更新用户信息异步action
export const update = (user)=>{
    return async dispatch =>{
        const response = await reqUpdateUser(user);
        const result = response.data
        if(result.code===0){  //更新成功：data
            dispatch(receiveUser(result.data))
        }else{                //更新失败：msg
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户信息异步action
export const getUser = (user)=>{
    return async dispatch =>{
        const response = await reqUser();
        const result = response.data
        if(result.code===0){  //获取成功：data
            getMsgList(dispatch,result.data._id);
            dispatch(receiveUser(result.data))
        }else{                //获取失败：msg
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户列表异步action
export const getUserList = (userType)=>{
    return async dispatch =>{
        const response = await reqUserList(userType);
        const result = response.data
        if(result.code===0){  //获取成功：data
            dispatch(receiveUserList(result.data))
        }
    }
}


//发送消息异步action
export const sendMsg = ({from,to,content})=>{
    return async dispatch =>{
        console.log('发消息',{from,to,content})
        initIO();
        //向服务器发送消息
        io.socket.emit('sendMsg',{from,to,content})   
    }
}
//读取消息异步action
export const readMsg = (from,to)=>{
    return async dispatch =>{
        const response = await reqReadMsg(from);
        const result = response.data
        if(result.code===0){  //获取成功：data
            const count = result.data;
            dispatch(msgRead({count,from,to}))
        }  
    }
}
//初始化socketIO
function initIO(dispatch,userid){
    if(!io.socket){
        //连接服务器，创建代表连接的socket对象
        io.socket = io('ws://localhost:4000')
        //绑定'receiveMessage'的监听，来接收服务器发送的消息
        io.socket.on('receiveMsg',function(chatMsg){
            console.log('浏览器端接收到消息',chatMsg)
            //只有当chatMsg是与当前用户相关的信息，才去分发同步action保存消息
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(receiveMsg({chatMsg,userid}))
            }
        })
    }
    

     
}