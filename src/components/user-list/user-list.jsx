import React from 'react';
import { Card, Space } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
const Header = Card.Header;
const Body = Card.Body;


function UserList(props) {
    const navigate = useNavigate()
        return (
            // <WingBlank style={{marginTop:50, marginBottom:60}}> 
                <QueueAnim type='scale' delay={100}>
                { 
                    props.userList.map(user => ( 
                        <div key={user._id}> 
                            <Space /> 
                            <Card onClick={() => navigate(`/chat/${user._id}`)}> 
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
            // </WingBlank>
        );
}

export default UserList;