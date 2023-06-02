import React, { useState } from 'react'
import { Form, List, Input, Space, Button, Tabs } from 'antd-mobile'
import { redirect, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import styles from './login.module.scss'

function Login() {
    const user = useSelector(state => state.user.userInfo)
    const [username, setUsername] = useState('user1')
    const [password, setPassword] = useState('123456')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 登录
    const toLogin = () => {
        dispatch(login({ username, password })).unwrap().then(res => {
            if(res && res.success) {
                navigate('/messages')
            }
        })
    }
    
    // 跳转注册页面
    const toRegister = () => {
        navigate('/register', true);
    }
    
    // 输入用户名
    const handleUsernameChange = (val) => {
        setUsername(val)
    }

    // 输入密码
    const handlePasswordChange = (val) => {
        setPassword(val)
    }

    const { msg, redirectTo } = user;
    if(redirectTo){
        return redirect(redirectTo)
    }
    return (
        <div>
            <Space direction='vertical' />
            <h2 className={styles.top_title}>登录CHAT</h2>
            <Space direction='vertical' />
            <Tabs>
                <Tabs.Tab title='密码登录' key='1'>
                    <Form layout='horizontal'>
                        <Form.Item label='用户名' name='username'>
                            <Input placeholder='请输入用户名' clearable value={username} defaultValue={username} onChange={val=>{handleUsernameChange(val)}} />
                        </Form.Item>
                        <Form.Item label='密码' name='password'>
                            <Input placeholder='请输入密码' clearable type='password' value={password} defaultValue={password}  onChange={val=>{handlePasswordChange(val)}} />
                        </Form.Item>
                    </Form>
                    <List>
                        <Space />
                        { msg ? <div className="error-msg">{msg}</div> : null }
                        <Space size="xl" />
                        <Button block shape='rounded' color='primary' onClick={toLogin}>登录</Button>
                        <Space size="xl" />
                        <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={toRegister}>去注册</span></div>
                        <Space size="xl"/>
                    </List>
                </Tabs.Tab>
                <Tabs.Tab title='短信登录' key='2'>
                    <Form layout='horizontal'>
                        <Form.Item label='手机号' name='username'>
                            <Input placeholder='请输入用户名' clearable value={username} defaultValue={username} onChange={val=>{handleUsernameChange(val)}} />
                        </Form.Item>
                        <Form.Item label='验证码' name='password'>
                            <Input placeholder='请输入密码' clearable type='password' value={password} defaultValue={password}  onChange={val=>{handlePasswordChange(val)}} />
                        </Form.Item>
                    </Form>
                        <List>
                            <Space />
                            { msg ? <div className="error-msg">{msg}</div> : null }
                            <Space size="xl" />
                            <Button block shape='rounded' color='primary' onClick={login}>登录</Button>
                            <Space size="xl" />
                            <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={toRegister}>去注册</span></div>
                            <Space size="xl"/>
                        </List>
                </Tabs.Tab>
            </Tabs>
        </div>
    );
}

export default Login;