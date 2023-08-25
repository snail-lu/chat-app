import React from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppOutline,
    MessageOutline,
    PhonebookOutline,
    UserOutline,
} from 'antd-mobile-icons'
import { useSelector } from 'react-redux';


export default function NavFooter() {
    const location = useLocation()
    const navigate = useNavigate()
    const { unReadCount } = useSelector(state => state.chat)
    console.log(unReadCount, 'unReadCount')

    const tabs = [
        {
            key: '/messages',
            title: '消息',
            icon: <MessageOutline />,
            text: '消息',
            badge: unReadCount > 0 ? unReadCount : '',
        },
        {
            key: '/friends',
            title: '通讯录',
            icon: <PhonebookOutline />,
            text: '通讯录'
        },
        {
            key: '/discover',
            title: '发现',
            icon: <AppOutline />,
            text: '发现'
        },
        {
            key: '/my',
            title: '我的',
            icon: <UserOutline />,
            text: '我'
        }
    ];

    // let { unReadCount } = props;
    const setRouteActive = (value) => {
        navigate(value)
    }
    const pathname = location.pathname;
    return (
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
            {
                tabs.map(item => (
                    <TabBar.Item
                        key={item.key}
                        icon={item.icon}
                        title={item.title}
                        badge={item.badge}
                    />
                ))
            }
        </TabBar>
    );
}