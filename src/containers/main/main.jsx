/**
 * 主界面的路由组件
 */
import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import NavFooter from '../../components/nav-footer/nav-footer';
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'                  //可以操作前端cookie的对象
import { Navigate } from 'react-router-dom'
import { getRedirectTo } from '../../utils';
import { getUser } from '../../redux/userSlice';
import styles from './main.module.scss'
import { getMsgList, receiveMsg } from '../../redux/chatSlice';
import io from 'socket.io-client'
// import Chat from '../chat/chat';
/**
 * 需要实现的功能：
 * 1.实现自动登录
 *   (1)componentDidMount()
 *       cookie中有userid，但是redux中没有_id,发送请求获取对应的user
 *   (2)render()
 *      1).如果cookie中没有userid，直接重定向到login
 *      2).判断redux管理的user中是否有_id，如果没有，暂时不做任何显示
 *      3).如果有，说明当前已经登录，显示对应的界面
 *      4).如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
 *     
 */
function Main() {
    const user = useSelector(state => state.user.userInfo)
    const location = useLocation()

    //读取cookie中的userid
    const userid = Cookies.get('userid');
    //如果没有，自动重定向到登录界面
    if (!userid) {
        return <Navigate to='/login' replace={true} />
    }

    //如果user没有_id,返回null(不做任何显示)
    let path = location.pathname;
    if (user?._id && path==='/') {
        //如果有_id(证明已经存在相应的用户信息),显示到对应的界面
        path = getRedirectTo();
        return <Navigate to={path} replace={true} />
    }

    return (
        <div>
            <Outlet />
            <div className={styles.bottom}>
                <NavFooter />
            </div>
        </div>
    );
}

export default Main;