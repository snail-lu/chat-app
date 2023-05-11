import React, { Component } from 'react';
import {connect} from 'react-redux';
import {List,Badge, NavBar} from 'antd-mobile-v2';
const Item = List.Item;
const Brief = Item.Brief;
/**
 * 
 * 对chatMsgs按chat_id进行分组，并得到每个组的lastMsg组成的数组
 * 1.找出每个聊天的lastMsg,并用一个对象容器来保存{chat_id,lastMsg}
 * 2.得到所有lastMsg的数组
 * 3.对数组进行排序（按create_time降序）
 */
function getLastMsgs(chatMsgs,userid){
    //1.
    const lastMsgObjs = {};
    chatMsgs.forEach(msg=>{
        //统计未读消息个数
        if(msg.to===userid && !msg.read){
            msg.unReadCount = 1;
        }else{
            msg.unReadCount = 0;
        }


        const chatId = msg.chat_id;
        let lastMsg = lastMsgObjs[chatId];
        if(!lastMsg){
            lastMsgObjs[chatId] = msg;
        }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId] = msg;
            }
            lastMsgObjs[chatId].unReadCount = unReadCount;
        }
    })

    //2.
    const lastMsgs = Object.values(lastMsgObjs);

    //3.
    lastMsgs.sort(function(m1,m2){
        return m2.create_time-m1.create_time;
    })
    console.log(lastMsgs);

    return lastMsgs;
}
class Message extends Component {
    render() {
        const {user} = this.props;
        const {users,chatMsgs} = this.props.chat;

        //对chatMsgs按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs,user._id)
        
        return (
            <div>
            <NavBar className="stick-top">CHAT</NavBar>
            <List style={{marginTop:50, marginBottom: 60}}>
                {
                    lastMsgs.map(msg=>{
                        const targetId = msg.to === user._id? msg.from:msg.to;
                        const targetUser = users[targetId];
                        return (
                            <Item
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={targetUser.header?require(`../../assets/images/${targetUser.header}.png`):require(`../../assets/images/头像1.png`)}
                                arrow='horizontal'
                                key={msg._id}
                                onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
            </div>
        );
    }
}

export default connect(
    state=>({user: state.user,chat: state.chat}),
    {}
)(Message);