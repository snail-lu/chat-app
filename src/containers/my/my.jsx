import React from 'react';
import { useSelector } from 'react-redux';
import { Result, Button, Space, Modal, NavBar, Image } from 'antd-mobile';
import Cookies from 'js-cookie';
import { resetUser } from '../../redux/actions'

export default function My() {
    const user = useSelector(state => state.user.userInfo)
    const handleLogout = ()=>{
        Modal.alert('退出','确认退出登录吗？',[
            {
                text: '取消',
                onPress: ()=>console.log('cancel')
            },
            {
                text: '确认',
                onPress: ()=>{
                    // 清除cookie
                    Cookies.remove('userid');

                    //重置redux中的user状态
                    this.props.resetUser();
                }
            }
        ])
    }
    const {username, avatar} = user;
    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>个人中心</NavBar>
            <div className="flex-box-column flex-v-center">
                <Image src={user.avatar ? require(`../../assets/images/${avatar}.png`) : require(`../../assets/images/头像1.png`)}
                    style={{ borderRadius: 20, marginTop: 20, marginBottom: 30 }}
                    fit='cover'
                    width={80}
                    height={80}
                />
                <div style={{ fontSize: 22, marginBottom: 40 }}>{username}</div>
                <Button block shape='rounded' color='primary' style={{ width: '60%' }} onClick={handleLogout}>退出登录</Button>
            </div>
        </div>
    );
}