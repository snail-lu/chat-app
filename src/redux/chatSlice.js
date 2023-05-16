import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            users: {}, //所有用户信息对象
            chatMsgs: [], // 当前用户相关的聊天信息列表
            unReadCount: 0  // 未读消息数量
        }
    },
    reducers: {
        receiveMsgList: (state, action) => {
            const { users, chatMsgs, userid } = action.payload;
            state.value = {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg)=> preTotal + (!msg.read&&msg.to===userid?1:0), 0)
            }  
        },
        
        receiveMsg: (state, action) => {
            const { chatMsg } = action.payload;
            state.value = {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        },
        
        msgRead: (state, action) => {
            const {from,to,count} = action.data;
            state.value = {
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
    }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { receiveMsgList, receiveMsg, msgRead } = chatSlice.actions

export default chatSlice.reducer