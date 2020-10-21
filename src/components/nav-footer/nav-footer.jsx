import React, { Component } from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';


const Item = TabBar.Item;

class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let {navList,unReadCount} = this.props;
        navList = navList.filter((nav)=>!nav.hide);
        //这里是非路由组件，无法直接访问路由组件的属性,需要引入withRouter
        const pathname = this.props.location.pathname;
        return (
            <TabBar>
                {
                    navList.map((nav,index)=>(
                        <Item key={index}
                              title={nav.text}
                              badge={nav.path==='/message'?unReadCount:0}
                              icon={{uri:require(`./images/${nav.icon}.png`)}}
                              selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                              selected={pathname===nav.path}
                              onPress={()=>this.props.history.replace(nav.path)} 
                        ></Item>
                    ))
                }
            </TabBar>
        );
    }
}
//向外暴露withRouter()包装产生的组件
//内部会向组件中传入一些路由组件特有的属性：location/history/math
export default withRouter(NavFooter);  