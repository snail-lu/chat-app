import React, { Component } from 'react';
import { WingBlank, List, InputItem as _InputItem, WhiteSpace, Radio, Button, Toast, Checkbox } from 'antd-mobile-v2'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'
import styles from './register.module.scss'
import { create, addErrorExplanation } from "ant-design-mobile-form";

const ListItem = List.Item;


const InputItem = addErrorExplanation(_InputItem);

class Register extends Component {
    state = {
        // type: 'dashen',      //用户类型名称  dashen/boss
        registerAgree: false,  // 用户协议授权
    }
    //  注册事件
    register = () => {
        const { registerAgree, type } = this.state;
        this.props.form.validateFields(async (errors, value) => {
            if(value.password !== value.password2){
                Toast.show('两次密码输入不一致！')
            }else if(!registerAgree) { 
                Toast.show('请勾选用户协议！')
            }
            else if (errors === null && registerAgree) {
                const params = { ...value, registerAgree }
                this.props.register(params)
            }
          });
    }

    // 跳转登录页面
    toLogin = () => {
        this.props.history.replace('/Login');
    }

    // 表单事件处理
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    // 用户协议弹窗显示
    showAgreement = () => {

    }

    render() {
        // const { type } = this.state;
        const { msg, redirectTo } = this.props.user;
        const { getFieldDecorator } = this.props.form;

        const data = [ 
            { value: 'dashen', label: '求职' },
            { value: 'boss', label: '招聘' }
        ]; 

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

                        {/* <ListItem>
                            <span>注册意向:</span>
                            {
                                
                                data.map(i => (
                                    <Radio className="register-radio" key={i.value} checked={type === i.value} onChange={() => this.handleChange('type', i.value)}>
                                    {i.label}
                                </Radio>
                                ))
                            }
                        </ListItem> */}
                        <WhiteSpace />

                        <Button type="primary" size="small" onClick={this.register}>注册</Button>
                        <WhiteSpace size="lg"/>
                        <div className={styles.footer_link}>
                            {/* <input type="checkbox" className={styles.agreement_btn} onChange={val=>this.handleChange('registerAgree', val)} /> */}
                            <Checkbox onChange={val=>this.handleChange('registerAgree', val.target.checked)} />
                            我已同意
                            <span className={styles.login_btn} onClick={this.showAgreement}>用户协议及隐私政策&nbsp;&nbsp;</span>
                            <span className={styles.login_btn} onClick={this.toLogin}>直接登录</span>
                        </div>
                        <WhiteSpace size="xl"/>       
                    </List>
                </div>
            </WingBlank>
        );
    }
}

const RegisterWrapper = create()(Register);
export default connect(
    state=>({user: state.user}),
    {register}
)(RegisterWrapper)