import { useState } from 'react';
import { List, Input, Space, Button, Toast, Checkbox, Form } from 'antd-mobile'
import { redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions'
import styles from './register.module.scss'
import { create, addErrorExplanation } from "ant-design-mobile-form";
import HeaderSelector from '../../components/header-selector/header-selector';

const ListItem = List.Item;

function Register() {
    const [avatar, setAvatar] = useState('')
    const [registerAgree, setRegisterAgree] = useState(false)
    const navigate = useNavigate()
    const [form] = Form.useForm()

    //  注册事件
    const toRegister = () => {
        // form.validateFields(async (errors, value) => {
        //     if (value.password !== value.password2) {
        //         Toast.show('两次密码输入不一致！')
        //     } else if (!registerAgree) {
        //         Toast.show('请勾选用户协议！')
        //     }
        //     else if (errors === null && registerAgree) {
        //         const params = { ...value, avatar }
        //         register(params)
        //     }
        // });
    }

    // 跳转登录页面
    const toLogin = () => {
        navigate({ path: '/login', replace: true })
    }

    // 表单事件处理
    const handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    // 用户协议弹窗显示
    const showAgreement = () => {

    }

    const setHeader = (avatar) => {
        setAvatar(avatar)
    }

    // const { msg, redirectTo } = props.user;
    // const { getFieldDecorator } = props.form;

    // if (redirectTo) {
    //     return redirect(redirectTo)
    // }
    return (
        <div className={styles['register-container']}>
            <h2 className={styles.top_title}>注册CHAT</h2>
                <Form
                    layout="horizontal"
                form={form}
                style={{ margin: '20px 0'}}
                    initialValues={{
                        a: 'aaa',
                        b: [],
                    }}
                >
                    <Form.Item name='username' label='用户名'>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item name='a' label='密码'>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item name='a' label='确认密码'>
                        <Input placeholder='请输入' />
                    </Form.Item>
                </Form>
                <Button block shape='rounded' color='primary' onClick={toRegister}>注册</Button>
                <div className={`flex-box flex-h-center flex-v-center ${styles.footer_link}`}>
                    {/* <input type="checkbox" className={styles.agreement_btn} onChange={val=>this.handleChange('registerAgree', val)} /> */}
                    <Checkbox onChange={val => handleChange('registerAgree', val.target.checked)} />
                    我已同意
                    <span className={styles.login_btn} onClick={showAgreement}>用户协议及隐私政策&nbsp;&nbsp;</span>
                    <span className={styles.login_btn} onClick={toLogin}>直接登录</span>
                </div>
        </div >
    );

}

export default create()(Register)