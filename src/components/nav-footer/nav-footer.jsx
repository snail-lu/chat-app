import React from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppOutline,
  MessageOutline,
  PhonebookOutline,
  UserOutline,
} from 'antd-mobile-icons'


export default function NavFooter(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const tabs = [
        {
            key: '/messages',
            title: '消息',
            icon: <MessageOutline />,
            text: '消息',
            badge: '10',
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
            key: '/personal',
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
                    // <Item key={ item.key }
                    //       title={ nav.text }
                    //       badge={ nav.path==='/message'?unReadCount:0}
                    //       icon={{ uri:require(`./images/${nav.icon}.png`)} }
                    //       selectedIcon={{ uri:require(`./images/${nav.icon}-selected.png`) }}
                    //       selected={ pathname===nav.path }
                    //       onPress={ ()=> navigate(nav.path) } 
                    // ></Item>
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