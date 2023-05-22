import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';


const Item = TabBar.Item;

export default function NavFooter(props) {
    const location = useLocation()
    const navigate = useNavigate()
    // static propTypes = {
    //     navList: PropTypes.array.isRequired
    // }
        let { navList, unReadCount } = props;
        navList = navList.filter((nav)=>!nav.hide);
        const pathname = location.pathname;
        return (
            <TabBar tintColor="#5dd5ca">
                {
                    navList.map(( nav, index ) => (
                        <Item key={ index }
                              title={ nav.text }
                              badge={ nav.path==='/message'?unReadCount:0}
                              icon={{ uri:require(`./images/${nav.icon}.png`)} }
                              selectedIcon={{ uri:require(`./images/${nav.icon}-selected.png`) }}
                              selected={ pathname===nav.path }
                              onPress={ ()=> navigate(nav.path) } 
                        ></Item>
                    ))
                }
            </TabBar>
        );
}