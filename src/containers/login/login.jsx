import React, { Component } from 'react'
import { WingBlank, List, InputItem, WhiteSpace, Button, Tabs } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'
import styles from './login.module.less'

class Login extends Component {
    state = {
        username: '', //用户名
        password: '', //密码
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
        this.props.history.replace('/Register');
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]: val
        })
    }
    render() {
        const { msg, redirectTo } = this.props.user;
        const { tabs } = this.state;
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <WingBlank>
                    <h2 className={styles.top_title}>登录BOSS智聘</h2>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <List>
                                <WhiteSpace />
                                { msg ? <div className="error-msg">{msg}</div> : null }
                                <InputItem type="text" onChange={val=>{this.handleChange('username',val)}} placeholder="请输入用户名">用户名:</InputItem>
                                <WhiteSpace />
                                <InputItem type="password" onChange={val=>{this.handleChange('password',val)}} placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码:</InputItem>
                                <WhiteSpace />
                                <Button type="default" size="small">点击进行验证</Button>
                                <WhiteSpace />
                                <Button type="primary" size="small" onClick={this.login}>登录</Button>
                                <WhiteSpace />
                                <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={this.toRegister}>去注册</span></div>
                                <WhiteSpace />
                            </List>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            <List>
                                <WhiteSpace />
                                { msg ? <div className="error-msg">{msg}</div> : null }
                                <InputItem type="text" onChange={val=>{this.handleChange('username',val)}} placeholder="手机号">手机号:</InputItem>
                                <WhiteSpace />
                                <Button type="default" size="small">点击进行验证</Button>
                                <WhiteSpace />
                                <InputItem type="password" onChange={val=>{this.handleChange('password',val)}} placeholder="短信验证码">验证码:</InputItem>
                                <WhiteSpace />
                                <Button type="primary" size="small" onClick={this.login}>登录</Button>
                                <WhiteSpace />
                                <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={this.toRegister}>去注册</span></div>
                                <WhiteSpace />
                            </List>
                        </div>
                    </Tabs>
                    
                </WingBlank>
            </div>
        );
    }
}
export default connect(
    state=>({user: state.user}),
    {login}
)(Login)