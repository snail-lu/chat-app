import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Badge, NavBar, Image } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { getLastMsgs } from '../../utils/index';
import { getMsgList } from '../../redux/chatSlice';
import { useEffect } from 'react';

export default function Message() {
    const user = useSelector(state => state.user.userInfo)
    const { users, chatMsgs } = useSelector(state => state.chat);
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMsgList(user._id))
    }, [])

    //对chatMsgs按chat_id进行分组，属于同一个会话的集合到一起
    const clonedChatMsgs = JSON.parse(JSON.stringify(chatMsgs))
    const lastMsgs = getLastMsgs(clonedChatMsgs, user._id)
    
    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>消息</NavBar>
            <List>
                {
                    lastMsgs.map(msg=>{
                        const targetId = msg.to === user._id? msg.from:msg.to;
                        const targetUser = users[targetId];
                        return (
                            <List.Item
                                extra={<Badge text={msg.unReadCount} />}
                                prefix={
                                    <Image
                                        src={targetUser.avatar ? require(`../../assets/images/${targetUser.avatar}.png`) : require(`../../assets/images/头像1.png`)}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40}
                                    />
                                }
                                key={msg._id}
                                onClick={() => navigate(`/chat/${targetId}`)}
                                description={msg.content}
                            >
                                {targetUser.username}
                            </List.Item>
                        )
                    })
                }
            </List>
        </div>
    );
}