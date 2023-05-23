import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/userSlice'
import UserList from '../../components/user-list/user-list'
import { NavBar } from 'antd-mobile';


function Friends() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.user.list)
    useEffect(() => {
        dispatch(getUserList())
    }, [])

    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>通讯录</NavBar>
            <UserList userList={userList} />
        </div>
    );
}

export default Friends;