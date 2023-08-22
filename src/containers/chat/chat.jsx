import React, { useEffect, useState, useRef } from 'react';
import { List, NavBar, Input, Grid, Form } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons'
import { useSelector, useDispatch } from 'react-redux';
import { sendMsg, readMsg } from '../../redux/chatSlice';
import QueueAnim from 'rc-queue-anim';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './chat.module.scss'
import ChatItem from '../../components/chat-item/chat-item';

function Chat() {
    const [content, setContent] = useState('')
    const [isShow, setIsShow] = useState(false)

    const { userid } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.userInfo)
    const { chatMsgs, users } = useSelector(state => state.chat);

    console.log(user, 'user')
    const handleSend = () => {
        const to = userid;
        const from = user._id;
        dispatch(sendMsg({ from, to, content: content.trim() }));
        setContent('')
        // setIsShow(false)
    }
    const toggleShow = () => {
        const show = !isShow;
        setIsShow(show)
        if (show) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    let emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜',
        '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶',
        '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
        '🤢', '🤮', '🤧', '😵'
    ]
    emojis = emojis.map(value => ({ text: value }))

    const myRef = useRef(null)
    const scrollToBottom = () => {
        if (myRef && myRef.current) {
            console.log(myRef, 'myRef')
            myRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollToBottom()

        //发请求，将未读消息状态更换为已读
        const from = userid;
        const to = user._id;
        // dispatch(readMsg({ from, to }))
    }, [chatMsgs, isShow])

    const meId = user._id;
    const chatId = [userid, meId].sort().join("_");
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    // const targetIcon = users[userid].avatar ? require(`../../assets/images/${users[userid].avatar}.png`):null;
    return (
        <div className={'flex-box-column ' + styles['chat-page']}>
            <NavBar
                icon={<RightOutline />}
                onBack={() => navigate(-1)}
            >
                {users[userid].username}
            </NavBar>
            <div className={ 'flex-item-1 ' + styles['chat-list']}>
                {
                    msgs.map(msg => {
                        const position = msg.from === userid ? 'left' : 'right';
                        const avatar = msg.from === userid ? users[userid].avatar : user.avatar;
                        // debugger
                        return <ChatItem msg={msg} key={msg._id} position={position} avatar={avatar} />
                    })
                }
                <div ref={myRef}></div>
            </div>


            {/* 聊天输入框 */}
            <div className="chat-input-box">
                <Form layout='horizontal'>
                    <Form.Item
                        label=''
                        extra={
                            <div>
                                <span onClick={toggleShow} className={styles['emoji-btn']}>🙂</span>
                                <span onClick={() => handleSend()}>发送</span>
                            </div>
                        }
                    >
                        <Input value={content} onChange={val => setContent(val)} placeholder='请输入' clearable />
                    </Form.Item>
                </Form>

                {
                    isShow ?
                        <div className={styles['grid-list']}>
                            <Grid
                                columns={6}
                                gap={20}
                            >
                                {
                                    emojis.map(item => {
                                        return (<Grid.Item key={item.text}>
                                            <div className={styles['grid-item-block']} onClick={() => setContent(content + item.text)}>{item.text}</div>
                                        </Grid.Item>)
                                    })
                                }
                            </Grid>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default Chat;