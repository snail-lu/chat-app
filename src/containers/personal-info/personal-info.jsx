import { useEffect, useState } from 'react';
import { Input, Button, Toast, Form, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { update } from '../../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import styles from './personal-info.module.scss';
import HeaderSelector from '../../components/header-selector/header-selector';
import { useRef } from 'react';


function PersonalInfo() {
    const user = useSelector(state => state.user.userInfo)
    const [avatar, setAvatar] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const myFormRef = useRef(null)
    useEffect(() => {
        myFormRef.current?.setFieldsValue({ username: user.username })
        setAvatar(user.avatar)
    }, [])

    // 保存
    const save = async () => {
        try {
            const data = await form.validateFields(['username'])
            if (!data.username || !data.username.trim()) {
                Toast.show('用户名不可为空！')
                return
            } 
            console.log(data, 'data')
            const params = { ...data, avatar }
            dispatch(update(params)).unwrap().then(res => {
                if (res && res.success) {
                    Toast.show('修改成功')
                    navigate(-1)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const setHeader = (avatar) => {
        setAvatar(avatar)
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={styles['register-container']}>
            <NavBar
                onBack={back}
                style={{ padding: 0 }}
            >个人信息</NavBar>
            <Form
                layout="horizontal"
                form={form}
                ref={myFormRef}
                style={{ '--border-top': 'none', '--prefix-width': '80px', marginTop: '50px' }}
            >
                <Form.Item name='username' label='用户名' style={{ '--padding-left': '0' }} rules={[{ required: true }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label="头像" style={{ '--padding-left': '0' }}>
                    <HeaderSelector onChange={setHeader} selected={avatar} />
                </Form.Item>
            </Form>
            <Button block shape='rounded' color='primary' onClick={save}>保存</Button>
        </div >
    );

}

export default PersonalInfo;