import React, { Component } from 'react'
import { WingBlank, List, InputItem, WhiteSpace, Button, Tabs } from 'antd-mobile-v2'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'
import styles from './login.module.scss'

class Login extends Component {
    state = {
        username: 'user1', //用户名
        password: '123456', //密码
        tabs: [
            { title: '密码登录' },
            { title: '短信登录' }
        ]
    }
    login = ()=>{
        // console.log(this.state
        this.props.login(this.state)
    }
    toRegister = ()=>{
        this.props.history.replace('/register');
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]: val
        })
    }
    render() {
        const { msg, redirectTo } = this.props.user;
        const { tabs, username, password } = this.state;
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <WingBlank>
                <WhiteSpace size="xl" />
                <h2 className={styles.top_title}>登录CHAT</h2>
                <WhiteSpace size="xl" />
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    <div className={styles.tab_item}>
                        <List>
                            <WhiteSpace />
                            { msg ? <div className="error-msg">{msg}</div> : null }
                            <InputItem type="text" value={username} onChange={val=>{this.handleChange('username',val)}} placeholder="请输入用户名">用户名:</InputItem>
                            <WhiteSpace />
                            <InputItem type="password" value={password}  onChange={val=>{this.handleChange('password',val)}} placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                            <WhiteSpace size="xl" />
                            {/* <Button type="default" size="small">点击进行验证</Button> */}
                            <Button type="primary" size="small" onClick={this.login}>登录</Button>
                            <WhiteSpace size="xl" />
                            <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={this.toRegister}>去注册</span></div>
                            <WhiteSpace size="xl"/>
                        </List>
                    </div>
                    <div className={styles.tab_item}>
                        <List>
                            <WhiteSpace />
                            { msg ? <div className="error-msg">{msg}</div> : null }
                            <InputItem type="number" onChange={val=>{this.handleChange('username',val)}} placeholder="手机号">手机号:</InputItem>
                            <WhiteSpace />
                            <InputItem type="number" onChange={val=>{this.handleChange('password',val)}} placeholder="验证码">验证码:</InputItem>
                            <WhiteSpace size="xl" />
                            {/* <Button type="default" size="small">点击进行验证</Button> */}
                            <Button type="primary" size="small" onClick={this.login}>登录</Button>
                            <WhiteSpace size="xl" />
                            <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={this.toRegister}>去注册</span></div>
                            <WhiteSpace size="xl"/>
                        </List>
                    </div>
                </Tabs>
            </WingBlank>
        );
    }
}
export default connect(
    state=>({ user: state.user }),
    { login }
)(Login)