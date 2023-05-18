import { useState } from 'react';
import { WingBlank, List, InputItem as _InputItem, WhiteSpace, Radio, Button, Toast, Checkbox } from 'antd-mobile-v2'
import { Redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions'
import styles from './register.module.scss'
import { create, addErrorExplanation } from "ant-design-mobile-form";
import HeaderSelector from '../../components/header-selector/header-selector';

const ListItem = List.Item;


const InputItem = addErrorExplanation(_InputItem);

function Register(props) {
    const [avatar, setAvatar] = useState('')
    const [registerAgree, setRegisterAgree] = useState(false)
    const navigate = useNavigate()

    //  注册事件
    const toRegister = () => {
        props.form.validateFields(async (errors, value) => {
            if(value.password !== value.password2){
                Toast.show('两次密码输入不一致！')
            }else if(!registerAgree) { 
                Toast.show('请勾选用户协议！')
            }
            else if (errors === null && registerAgree) {
                const params = { ...value, avatar }
                register(params)
            }
          });
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

        const { msg, redirectTo } = this.props.user;
        const { getFieldDecorator } = this.props.form;

        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <WingBlank size="lg">
                <WhiteSpace size="xl" />
                <h2 className={styles.top_title}>注册CHAT</h2>
                <WhiteSpace size="xl" />
                <div className={styles.content_box}>
                    <List>
                        {msg? <div className="error-msg">{msg}</div>:null}
                        <WhiteSpace />

                        { getFieldDecorator("username", {
                            rules: [{ required: true, message: "用户名不可为空"},]
                        })(<InputItem placeholder="请输入用户名">用户名：</InputItem>)}

                        { getFieldDecorator("password", {
                            rules: [{ required: true, message: "密码不可为空"},]
                        })(<InputItem placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码：</InputItem>)}
                        { getFieldDecorator("password2", {
                            rules: [{ required: true, message: "确认密码不可为空"},]
                        })(<InputItem placeholder="请输入确认密码">确认密码：</InputItem>)}

                        <WhiteSpace />

                        <HeaderSelector setHeader={this.setHeader}/>

                        <Button type="primary" size="small" onClick={toRegister}>注册</Button>
                        <WhiteSpace size="lg"/>
                        <div className={styles.footer_link}>
                            {/* <input type="checkbox" className={styles.agreement_btn} onChange={val=>this.handleChange('registerAgree', val)} /> */}
                            <Checkbox onChange={val=>this.handleChange('registerAgree', val.target.checked)} />
                            我已同意
                            <span className={styles.login_btn} onClick={showAgreement}>用户协议及隐私政策&nbsp;&nbsp;</span>
                            <span className={styles.login_btn} onClick={toLogin}>直接登录</span>
                        </div>
                        <WhiteSpace size="xl"/>       
                    </List>
                </div>
            </WingBlank>
        );
   
}

export default create()(Register)