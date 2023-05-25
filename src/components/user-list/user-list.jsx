import React from 'react';
import { Card, Space } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
// import QueueAnim from 'rc-queue-anim';

function UserList(props) {
    const navigate = useNavigate()
    const userList = props.userList

    if (userList && userList.length) {
        return userList.map(user => ( 
                    <div key={user._id}> 
                        <Space /> 
                        <Card onHeaderClick={() => navigate(`/chat/${user._id}`)} title={user.username}> 
                            {/* <Header 
                                thumb={user.avatar ? require(`../../assets/images/${user.avatar}.png`) : null} 
                                extra={user.username} /> */}
                        </Card> 
                    </div> 
                ))
    } else {
        return <div>暂无用户</div>
    }
    // return (
    //     // <WingBlank style={{marginTop:50, marginBottom:60}}> 
    //         // <QueueAnim type='scale' delay={100}>
    //         // </QueueAnim>
    //     // </WingBlank>
    // );
}

export default UserList;