import React, { useEffect, useState } from 'react';
import { List, NavBar, Input, Grid } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons'
import {connect} from 'react-redux';
import {sendMsg,readMsg} from './../../redux/actions';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;

function Chat(props) {
    const [content, setContent] = useState('')
    const [isShow, setIsShow] = useState(false)

    const handleSend = ()=>{
        const content = content.trim();
        const to = props.match.params.userid;
        const from = props.user._id;
        props.sendMsg({ from, to, content });
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
        const from = props.match.params.userid;
        const to = props.user._id;
        console.log(props.user._id)
        props.readMsg(from,to)
    })

    // componentDidUpdate(){
    //     window.scrollTo(0,document.body.scrollHeight)
    // }
        const {user} = props;
        const {chatMsgs,users} = props.chat;
        const targetId = props.match.params.userid;
        if(!users[targetId]){
            return null
        }
        const meId = user._id;
        const chatId = [targetId,meId].sort().join("_");
        const msgs = chatMsgs.filter(msg=>msg.chat_id===chatId);
        const targetIcon = users[targetId].header ? require(`../../assets/images/${users[targetId].header}.png`):null;
        return (
            <div id='chat-page'>
                <NavBar className="stick-top"
                        icon={<RightOutline />}
                        onLeftClick={()=>props.history.goBack()}
                    >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop:50, marginBottom:50}}>
                    <QueueAnim type='scale' delay={100}>
                    {
                        msgs.map(msg=>{
                            if(msg.from===targetId){
                                return (
                                    <Item 
                                        key={msg._id}
                                        thumb={targetIcon}
                                        extra={targetIcon?null:users[targetId].username}
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

export default connect(
    state => ({user: state.user,chat: state.chat}),
    {sendMsg,readMsg}
)(Chat);