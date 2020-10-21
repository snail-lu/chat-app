import React, { Component } from 'react';
import {List,NavBar,InputItem,Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {sendMsg,readMsg} from './../../redux/actions';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;

class Chat extends Component {
    state={
        content:'',
        isShow: false
    }

    handleSend=()=>{
        const content = this.state.content.trim();
        const to = this.props.match.params.userid;
        const from = this.props.user._id;
        this.props.sendMsg({from,to,content});
        this.setState({
            content:'',
            isShow: false
        })
    }
    toggleShow = ()=>{
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if(isShow){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }
    componentWillMount(){
        this.emojis = ['😀','😃' ,'😄' ,'😁' ,'😆' ,'😅' ,'🤣','😂' ,'🙂' ,'🙃' ,
        '😉','😊' ,'😇' ,'😍' ,'🤩' ,'😘' ,'😗' ,'😚','😙' ,'😋' ,'😛' ,'😜',
        '🤪' ,'😝' ,'🤑' ,'🤗' ,'🤭' ,'🤫' ,'🤔' ,'🤐' ,'🤨' ,'😐' ,'😑' ,'😶' ,
        '😏' ,'😒' ,'🙄' ,'😬','🤥' ,'😌' ,'😔' ,'😪' ,'🤤','😴','😷','🤒' ,'🤕',
        '🤢' ,'🤮' ,'🤧' ,'😵' 
    ]
         this.emojis = this.emojis.map(value=>({text:value}))
    }

    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight)

        //发请求，将未读消息状态更换为已读
        const from = this.props.match.params.userid;
        const to = this.props.user._id;
        console.log(this.props.user._id)
        this.props.readMsg(from,to)
    }

    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    render() {
        const {user} = this.props;
        const {chatMsgs,users} = this.props.chat;
        const targetId = this.props.match.params.userid;
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
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>this.props.history.goBack()}
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
                    <InputItem 
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val=>this.setState({content:val})}
                        onFocus={()=>this.setState({isShow:false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight:10}}>🙂</span>
                                <span onClick={this.handleSend}>发送</span>
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
}

export default connect(
    state => ({user: state.user,chat: state.chat}),
    {sendMsg,readMsg}
)(Chat);