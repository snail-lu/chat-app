import React, { Component } from 'react';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile-v2';
import {withRouter} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
const Header = Card.Header;
const Body = Card.Body;


class UserList extends Component { 
    render() {
        return (
            <WingBlank style={{marginTop:50, marginBottom:60}}> 
                <QueueAnim type='scale' delay={100}>
                { 
                    this.props.userList.map(user => ( 
                        <div key={user._id}> 
                            <WhiteSpace/> 
                            <Card onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}> 
                                <Header 
                                    thumb={user.header ? require(`../../assets/images/${user.header}.png`) : null} 
                                    extra={user.username} />
                                <Body> 
                                    <div>职位: {user.post}</div> 
                                    {
                                        user.company ? <div>公司: {user.company}</div> : null
                                    } 
                                    {
                                        user.salary ? <div>月薪: {user.salary}</div> : null
                                    } 
                                    <div>描述: {user.info}</div> 
                                </Body> 
                            </Card> 
                        </div> 
                    )) 
                } 
                </QueueAnim>
            </WingBlank>
        );
    }
}

export default withRouter(UserList);