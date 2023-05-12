import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Result, List, Button, WhiteSpace, Modal, NavBar } from 'antd-mobile-v2';
import Cookies from 'js-cookie';

import {resetUser} from '../../redux/actions'
const Item = List.Item;
const Brief = Item.Brief;

class Person extends Component {
    handleLogout = ()=>{
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
    render() {
        const {username, avatar} = this.props.user;
        return (
            <div style={{ marginTop:50, marginBottom:60 }}>
                <NavBar className="stick-top">个人中心</NavBar>
                <Result 
                    img={<img src={require(`../../assets/images/${avatar}.png`)} style={{width:50}} alt="header"/>}
                    title={username}
                />
                {/* <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary?<Brief>薪资：{salary}</Brief>:null}
                    </Item>
                </List> */}
                <WhiteSpace />
                <Button type="warning" onClick={this.handleLogout}>退出登录</Button>
            </div>
        );
    }
}

export default connect(
    state=>({user: state.user}),
    {resetUser}
)(Person);