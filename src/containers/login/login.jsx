import React, { useState } from 'react'
import { Form, List, Input, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/userSlice'
import styles from './login.module.scss'
import { useEffect } from 'react'

function Login() {
    const user = useSelector(state => state.user.userInfo)
    const [username, setUsername] = useState('user1')
    const [password, setPassword] = useState('123456')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 登录
    const toLogin = () => {
        dispatch(login({ username, password })).unwrap().then(res => {
            if (res && res.success) {
                navigate('/messages', true)
            }
        })
    }

    // 跳转注册页面
    const toRegister = () => {
        navigate('/register', true);
    }

    useEffect(() => {
        // 已登录用户免登录
        if (user && user._id) {
            navigate('/messages', true)
        }
    }, [])

    return (
        <div className={styles['login-container']}>
            <h2 className={styles.top_title}>登录CHAT</h2>
            <Form layout='horizontal' style={{ '--border-top': 'none', '--prefix-width': '60px', 'marginTop': '50px' }}>
                <Form.Item label='用户名' name='username' style={{ '--padding-left': '0' }}>
                    <Input placeholder='请输入用户名' clearable value={username} defaultValue={username} onChange={val => setUsername(val)} />
                </Form.Item>
                <Form.Item label='密码' name='password' style={{ '--padding-left': '0' }}>
                    <Input placeholder='请输入密码' clearable type='password' value={password} defaultValue={password} onChange={val => setPassword(val)} />
                </Form.Item>
            </Form>
            <List style={{ '--border-top': 'none', '--border-bottom': 'none', marginTop: '40px' }}>
                <Button block shape='rounded' color='primary' onClick={toLogin}>登录</Button>
                <div className={styles.register_link}>没有账号？<span className={styles.register_btn} onClick={toRegister}>去注册</span></div>
            </List>
        </div>
    );
}

export default Login;