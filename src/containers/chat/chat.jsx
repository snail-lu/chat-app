import React, { useEffect, useState } from 'react';
import { List, NavBar, Input, Grid } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons'
import { useSelector, useDispatch } from 'react-redux';
import { sendMsg, readMsg } from '../../redux/chatSlice';
import QueueAnim from 'rc-queue-anim';
import { useParams } from 'react-router-dom';

const Item = List.Item;

function Chat(props) {
    const [content, setContent] = useState('')
    const [isShow, setIsShow] = useState(false)

    const { userid } = useParams()
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const handleSend = ()=>{
        const content = content.trim();
        const to = userid;
        const from = user._id;
        dispatch(sendMsg({ from, to, content }));
        setContent('')
        setIsShow(false)
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
        debugger
        dispatch(readMsg({ from, to }))
    }, [])

    // componentDidUpdate(){
    //     window.scrollTo(0,document.body.scrollHeight)
    // }
        const { chatMsgs,users } = useSelector(state => state.chat);
        if(!users[userid]){
            return null
        }
        const meId = user._id;
        const chatId = [userid, meId].sort().join("_");
        const msgs = chatMsgs.filter(msg=>msg.chat_id===chatId);
        const targetIcon = users[userid].avatar ? require(`../../assets/images/${users[userid].avatar}.png`):null;
        return (
            <div id='chat-page'>
                <NavBar className="stick-top"
                        icon={<RightOutline />}
                        onLeftClick={()=>props.history.goBack()}
                    >
                    {users[userid].username}
                </NavBar>
                <List style={{marginTop:50, marginBottom:50}}>
                    <QueueAnim type='scale' delay={100}>
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
                    </QueueAnim>    
                </List>

                <div className="am-tab-bar">
                    <Input 
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val=>this.setState({content:val})}
                        onFocus={()=>this.setState({isShow:false})}
                        extra={
                            <span>
                                <span onClick={toggleShow} style={{marginRight:10}}>🙂</span>
                                <span onClick={handleSend}>发送</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow?(
                            <Grid 
                                data={this.emojis}
                                columnNum={6}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item)=>{
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />
                        ): null
                    }
                </div>
            </div>
        );
    }

export default Chat;