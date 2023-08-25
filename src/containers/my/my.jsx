import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, NavBar, Image } from 'antd-mobile';
import Cookies from 'js-cookie';
import { resetUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom';

export default function My() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userInfo)
    const handleLogout = async () => {
        const confirm = await Dialog.confirm({
            content: '确认退出登录吗？'
        })
        if (confirm) {
            // 清除cookie
            Cookies.remove('userid');

            // 重置redux中的user状态
            dispatch(resetUser());
        } else {}
    }
    const navigate = useNavigate()
    const toPersonalInfo = () => {
        navigate('/personal-info')
    }
    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>个人中心</NavBar>
            <div className="flex-box-column flex-v-center">
                <Image src={user?.avatar ? require(`../../assets/images/${user?.avatar}.png`) : require(`../../assets/images/头像1.png`)}
                    style={{ borderRadius: 20, marginTop: 20, marginBottom: 30 }}
                    fit='cover'
                    width={80}
                    height={80}
                    onClick={toPersonalInfo}
                />
                <div style={{ fontSize: 22, marginBottom: 40 }} onClick={toPersonalInfo}>{user?.username}</div>
                <Button block shape='rounded' color='primary' style={{ width: '80%' }} onClick={handleLogout}>退出登录</Button>
            </div>
        </div>
    );
}