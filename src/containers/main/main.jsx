/**
 * 主界面的路由组件
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Friends from '../friends/friends';
import Discover from '../discover/discover';
import Message from '../message/message';
import Personal from '../personal/personal';
import NavFooter from '../../components/nav-footer/nav-footer';
import { connect } from 'react-redux'
import Cookies from 'js-cookie'                  //可以操作前端cookie的对象
import { Redirect } from 'react-router-dom'
import { getRedirectTo } from '../../utils';
import { getUser } from '../../redux/actions';
import Chat from '../chat/chat';
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
class Main extends Component {
    navList = [
        {
            path: '/message',
            component: Message,
            title: '消息',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/friends',
            component: Friends,
            title: '通讯录',
            icon: 'jianli',
            text: '通讯录'
        },
        // {
        //     path: '/job',
        //     component: Job,
        //     title: '职位',
        //     icon: 'gangwei',
        //     text: '职位'
        // },
        {
            path: '/discover',
            component: Discover,
            title: '发现',
            icon: 'faxian',
            text: '发现'
        },
        {
            path: '/personal',
            component: Personal,
            title: '我',
            icon: 'personal',
            text: '我'
        }
    ];
    componentDidMount(){
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if(userid && !_id){
            //发送异步申请，获取对应的user
            this.props.getUser();
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid');
        //如果没有，自动重定向到登录界面
        if(!userid){
            return <Redirect to='/login' />
        }
        //如果有，读取redux中的user状态
        const {user,unReadCount} = this.props;
        //如果user没有_id,返回null(不做任何显示)
        if(!user._id){
            return null;
        }else{
            //如果有_id(证明已经存在相应的用户信息),显示到对应的界面
            let path = this.props.location.pathname;
            if(path==='/'){       //如果请求的是根路径
                //计算一个重定向的路由路径
                path = getRedirectTo(user.type,user.header);
                return <Redirect to={path} />
            }
        }
        /*
        //检查用户是否登录，如果没有，自动重定向到登录界面
        const {user} = this.props;
        if(!user._id){
            return <Redirect to='/login' />
        }
        */

        const path = this.props.location.pathname;
        const currentNav = this.navList.find(nav=>nav.path===path);
        // if(currentNav){
        //     if(user.type==='boss'){
        //         this.navList[1].hide = true;
        //     }else{
        //         this.navList[0].hide = true;
        //     }
        // }
        return (
            <div>
                {/* {currentNav ? <NavBar className="stick-top">{currentNav.title}</NavBar>:null} */}
                <Switch>
                    {
                        this.navList.map(nav=><Route path={nav.path} component={nav.component} key={nav.path} />)
                    }
                    <Route path='/chat/:userid' component={Chat} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={this.navList} unReadCount={unReadCount}/>:null}
            </div>
        );
    }
}

export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main);