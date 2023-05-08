/**
 * 包含多个reducer函数: 根据旧的state和指定的action返回一个新的state
 */
import { combineReducers } from 'redux';
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types';
import {getRedirectTo} from '../utils'

const initUser = {
    username: '', //用户名
    type: '',     //用户类型
    msg: '',       //返回的错误信息
    redirectTo:''   //需要自动重定向的路由路径
}
const initUserList = [];
//产生user状态的reducer
function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            const {type,header} = action.data;
            return {...action.data,redirectTo:getRedirectTo('boss',header)}

        case ERROR_MSG:
            return {msg:action.msg}

        case RECEIVE_USER:
            return action.data

        case RESET_USER:
            return {...initUser,msg:action.data}

        default: 
        return state;
    }
}

function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
            return action.data
    
        default:
            return state
    }
}
const initChat = {
    users:{},                //所有用户信息对象
    chatMsgs:[],             //当前用户相关的聊天信息列表
    unReadCount: 0           //未读消息数量
}

function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,userid} = action.data;
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        
        case RECEIVE_MSG:
            const {chatMsg}=action.data;
            return {
                users: state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        
        case MSG_READ:
            const {from,to,count} = action.data;
            return{
                chatMsgs: state.chatMsgs.map(msg=>{
                    if(msg.from===from && msg.to===to && !msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                users: state.users,
                unReadCount: state.unReadCount-count
            }

        default: 
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})

