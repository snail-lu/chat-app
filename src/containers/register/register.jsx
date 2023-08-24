import { useState } from 'react';
import { Input, Button, Toast, Checkbox, Form } from 'antd-mobile'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import styles from './register.module.scss';
import HeaderSelector from '../../components/header-selector/header-selector';


function Register() {
    const user = useSelector(state => state.user.userInfo)
    const [avatar, setAvatar] = useState('')
    const [registerAgree, setRegisterAgree] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password2Visible, setPassword2Visible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    //  注册事件
    const toRegister = async () => {
        try {
            const data = await form.validateFields(['username', 'password', 'password2'])
            if (data.password !== data.password2) {
                Toast.show('两次密码输入不一致！')
                return
            } else if (!registerAgree) {
                Toast.show({
                    content: '请勾选用户协议！',
                })
                return
            }
            dispatch(register(data)).unwrap().then(res => {
                if (res && res.success) {
                    navigate('/messages')
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    // 跳转登录页面
    const toLogin = () => {
        navigate('/login', true)
    }

    // 用户协议弹窗显示
    const showAgreement = () => {

    }

    const setHeader = (avatar) => {
        setAvatar(avatar)
    }

    const { msg, redirectTo } = user;
    if (redirectTo) {
        return redirect(redirectTo)
    }
    return (
        <div className={styles['register-container']}>
            <h2 className={styles.top_title}>注册CHAT</h2>
            <Form
                layout="horizontal"
                form={form}
                style={{ '--border-top': 'none', '--prefix-width': '80px', marginTop: '50px' }}
                initialValues={{
                    username: '',
                    password: '',
                    password2: ''
                }}
            >
                <Form.Item name='username' label='用户名' style={{ '--padding-left': '0' }} rules={[{ required: true }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item name='password' label='密码' style={{ '--padding-left': '0' }} rules={[{ required: true }]} extra={
                    <div className={styles.eye}>
                        {!passwordVisible ? (
                            <EyeInvisibleOutline onClick={() => setPasswordVisible(true)} />
                        ) : (
                            <EyeOutline onClick={() => setPasswordVisible(false)} />
                        )}
                    </div>
                }>
                    <Input placeholder='请输入密码' type={passwordVisible ? 'text' : 'password'} />
                </Form.Item>
                <Form.Item name='password2' label='确认密码' style={{ '--padding-left': '0' }} rules={[{ required: true }]} extra={
                    <div className={styles.eye}>
                        {!password2Visible ? (
                            <EyeInvisibleOutline onClick={() => setPassword2Visible(true)} />
                        ) : (
                            <EyeOutline onClick={() => setPassword2Visible(false)} />
                        )}
                    </div>
                }>
                    <Input placeholder='请输入确认密码' type={password2Visible ? 'text' : 'password'} />
                </Form.Item>
                <Form.Item label="头像" style={{ '--padding-left': '0' }}>
                    <HeaderSelector setHeader={setHeader} />
                </Form.Item>
            </Form>
            <Button block shape='rounded' color='primary' onClick={toRegister}>注册</Button>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <div className={`flex-box flex-v-center flex-h-center ${styles.agreement_box}`}>
                <Checkbox onChange={checked => setRegisterAgree(checked)} style={{
                    '--icon-size': '18px',
                    '--font-size': '13px',
                    '--gap': '6px',
                }}>
                    <span>我已同意</span>
                </Checkbox>
                <span className={styles.agreement_btn} onClick={showAgreement}>用户协议</span>
                及
                <span className={styles.agreement_btn} onClick={showAgreement}>隐私政策</span>
            </div>
            <div className={styles.login_link}>已有账号？<span className={styles.login_btn} onClick={toLogin}>去登录</span></div>
        </div >
    );

}

export default Register;