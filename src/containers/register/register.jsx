import React, { Component } from 'react';
import {NavBar,WingBlank,List,InputItem,WhiteSpace,Radio,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'
import './register.less'
import '../../assets/css/index.less'
const ListItem = List.Item;

class Register extends Component {
    state = {
        username: '', //用户名
        password: '', //密码
        password2: '', //确认密码
        type: 'dashen',      //用户类型名称  dashen/boss
    }
    register = ()=>{
        // console.log(this.state)
        this.props.register(this.state)
    }
    toLogin = ()=>{
        this.props.history.replace('/Login');
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]: val
        })
    }
    render() {
        const {type} = this.state;
        const {msg,redirectTo} = this.props.user;
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div className="register-box">
                <NavBar>xx招聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg? <div className="error-msg">{msg}</div>:null}
                        <WhiteSpace />
                        <InputItem onChange={val=>{this.handleChange('username',val)}} placeholder="请输入用户名">用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val=>{this.handleChange('password',val)}} placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val=>{this.handleChange('password2',val)}} placeholder="请再次输入密码">确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={()=>{this.handleChange('type','dashen')}}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='boss'} onChange={()=>{this.handleChange('type','boss')}}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state=>({user: state.user}),
    {register}
)(Register)