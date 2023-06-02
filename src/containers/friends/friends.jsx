import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/userSlice'
import { NavBar, List, Image } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';


function Friends() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.user.list)

    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    return (
        <div>
            <NavBar 
                className="stick-top"
                style={{
                '--border-bottom': '1px #eee solid',
                }} 
                backArrow={false}
            >
                通讯录
            </NavBar>
            <List>
                {
                    userList.map(user=>{
                        return (
                            <List.Item
                                prefix={
                                    <Image
                                        src={user.avatar ? require(`../../assets/images/${user.avatar}.png`) : require(`../../assets/images/头像1.png`)}
                                        style={{ borderRadius: 20 }}
                                        fit='cover'
                                        width={40}
                                        height={40}
                                    />
                                }
                                key={user._id}
                                onClick={() => navigate(`/chat/${user._id}`)}
                                arrow={false}
                            >
                                {user.username}
                            </List.Item>
                        )
                    })
                }
            </List>
        </div>
    );
}

export default Friends;