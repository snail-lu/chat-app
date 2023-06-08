import React, { useEffect, useState } from 'react';
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
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        if(show){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    let emojis = ['😀','😃' ,'😄' ,'😁' ,'😆' ,'😅' ,'🤣','😂' ,'🙂' ,'🙃' ,
        '😉','😊' ,'😇' ,'😍' ,'🤩' ,'😘' ,'😗' ,'😚','😙' ,'😋' ,'😛' ,'😜',
        '🤪' ,'😝' ,'🤑' ,'🤗' ,'🤭' ,'🤫' ,'🤔' ,'🤐' ,'🤨' ,'😐' ,'😑' ,'😶' ,
        '😏' ,'😒' ,'🙄' ,'😬','🤥' ,'😌' ,'😔' ,'😪' ,'🤤','😴','😷','🤒' ,'🤕',
        '🤢' ,'🤮' ,'🤧' ,'😵' 
    ]
    emojis = emojis.map(value=>({text:value}))

    useEffect(() =>{
        window.scrollTo(0,document.body.scrollHeight)

        //发请求，将未读消息状态更换为已读
        const from = userid;
        const to = user._id;
        // debugger
        dispatch(readMsg({ from, to }))
    }, [])

    // componentDidUpdate(){
    //     window.scrollTo(0,document.body.scrollHeight)
    // }
        const { chatMsgs, users } = useSelector(state => state.chat);
        // if(!users[userid]){
        //     return null
        // }
        const selectEmoji = (item) => {
            console.log(item, 'item')
        }
        const meId = user._id;
        const chatId = [userid, meId].sort().join("_");
        const msgs = chatMsgs.filter(msg=>msg.chat_id===chatId);
        const targetIcon = users[userid].avatar ? require(`../../assets/images/${users[userid].avatar}.png`):null;
        return (
            <div id='chat-page'>
                <NavBar className="stick-top"
                        icon={<RightOutline />}
                        onBack={() => navigate(-1)}
                    >
                    {users[userid].username}
                </NavBar>
                {/* <List>
                    {
                        msgs.map(msg=>{
                            if(msg.from===userid){
                                return (
                                    <Item 
                                        key={msg._id}
                                        thumb={targetIcon}
                                        extra={targetIcon?null:users[userid].username}
                                    >
                                    {msg.content}
                                    </Item>
                                )
                            }else{
                                return (
                                    <Item 
                                        key={msg._id}
                                        className='chat-me'
                                        extra='我'
                                    >
                                    {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }
                </List> */}
                {
                    msgs.map(msg => {
                        const position = msg.from===userid ? 'left' : 'right';
                        const avatar = msg.from===userid ? users[userid].avatar : user.avatar;
                        // debugger
                        return <ChatItem msg={msg} key={msg._id} position={position} avatar={avatar} />
                    })
                }
                
                {/* 聊天输入框 */}
                <div className="am-tab-bar">
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
                            <Input value={content} onChange={val=> setContent(val)} placeholder='请输入' clearable />
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
                                                <div className={styles['grid-item-block']} onClick={() => setContent(content + item.text)}>{ item.text }</div>
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