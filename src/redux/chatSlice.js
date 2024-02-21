import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { reqChatList, reqReadMsg, reqChatDetail } from '../api'

// 异步获取消息列表
export const getChatList = createAsyncThunk('chat/getChatList', async (userid) => {
    initIO(userid)
    try {
        const response = await reqChatList()
        return response;
    } catch(e) {
        console.log(e)
    }

})

// 获取会话详情
export const getChatDetail = createAsyncThunk('chat/getChatDetail', async (chat_id) => {
    try {
        const response = await reqChatDetail({ chat_id })
        return response;
    } catch(e) {
        console.log(e)
    }
})

//发送消息
export const sendMsg = createAsyncThunk('chat/send', ({ from, to, content }) => {
    initIO();
    //向服务器发送消息
    io.socket.emit('sendMsg', { from, to, content })
})

//读取消息
export const readMsg = createAsyncThunk('chat/read', async ({ from, to })=>{
    try {
        const response = await reqReadMsg(from);
        return { from, to, count: response.data }
    } catch(e) {
        console.log(e)
    }

})

//初始化socketIO
function initIO(userid) {
    // const dispatch = useDispatch()
    if(!io.socket){
        //连接服务器，创建代表连接的socket对象
        io.socket = io('ws://localhost:4000')
        //绑定'receiveMessage'的监听，来接收服务器发送的消息
        io.socket.on('receiveMsg',function(chatMsg){
            console.log('浏览器端接收到消息',chatMsg)
            //只有当chatMsg是与当前用户相关的信息，才去分发同步action保存消息
            if(userid===chatMsg.from || userid===chatMsg.to){
                // dispatch(receiveMsg({chatMsg,userid}))
            }
        })
    }
}

const initialState = {
    users: {}, //所有用户信息对象
    chatMsgs: [], // 当前用户相关的聊天信息列表
    unReadCount: 0  // 未读消息数量
}
export const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        receiveMsgList: (state, action) => {
            const { users, chatMsgs, userid } = action.payload;
            state = {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg)=> preTotal + (!msg.read&&msg.to===userid?1:0), 0)
            }  
        },
        
        receiveMsg: (state, action) => {
            const { chatMsg, userid } = action.payload;
            console.log(chatMsg, userid, '收到了消息')
            state.chatMsgs = [...state.chatMsgs, chatMsg]
            state.unReadCount = state.unReadCount + (!chatMsg.read&&chatMsg.to===userid?1:0)
            // state = {
            //     users: state.users,
            //     chatMsgs: [...state.chatMsgs, chatMsg],
            //     unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===userid?1:0)
            // }
        },
        
        msgRead: (state, action) => {
            const {from,to,count} = action.data;
            state = {
                chatMsgs: state.chatMsgs.map(msg=>{
                    if (msg.from===from && msg.to===to && !msg.read) {
                        return {...msg,read:true}
                    } else {
                        return msg
                    }
                }),
                users: state.users,
                unReadCount: state.unReadCount - count
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getChatList.fulfilled, (state, action) => {
                const result = action.payload;
                if (result.code === 200) {
                    const { users, chatMsgs, userid } = result.result;
                    state.users = users
                    state.chatMsgs = chatMsgs
                    state.unReadCount = chatMsgs.reduce((preTotal, msg)=> preTotal + (!msg.read&&msg.to===userid ? 1 : 0), 0)
                }
            })
            .addCase(readMsg.fulfilled, (state, action) => {
                const { from, to, count } = action.payload;
                state.chatMsgs = state.chatMsgs.map(msg=>{
                    if (msg.from===from && msg.to===to && !msg.read) {
                        return {...msg, read:true }
                    } else {
                        return msg
                    }
                })
                state.unReadCount = state.unReadCount - count
            })
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { receiveMsgList, receiveMsg, msgRead } = chatSlice.actions

export default chatSlice.reducer