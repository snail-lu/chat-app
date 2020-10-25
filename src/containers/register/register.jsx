import React, { Component } from 'react';
import { WingBlank, List, InputItem, WhiteSpace, Radio, Button, Checkbox } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'
import styles from './register.module.less'

const ListItem = List.Item;
const AgreeItem = Checkbox.AgreeItem;

class Register extends Component {
    state = {
        username: '', //用户名
        password: '', //密码
        password2: '', //确认密码
        type: 'dashen',      //用户类型名称  dashen/boss
    }
    //  注册事件
    register = () => {
        // console.log(this.state)
        this.props.register(this.state)
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
        const { type } = this.state;
        const { msg, redirectTo } = this.props.user;
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
                <h2 className={styles.top_title}>注册BOSS智聘</h2>
                <WhiteSpace size="xl" />
                <div className={styles.content_box}>
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
                            <span>注册意向:</span>
                            {
                                data.map(i => (
                                    <Radio className="register-radio" key={i.value} checked={type === i.value} onChange={() => this.handleChange('type', i.value)}>
                                    {i.label}
                                </Radio>
                                ))
                            }
                        </ListItem>
                        <WhiteSpace />

                        <Button type="primary" size="small" onClick={this.register}>注册</Button>
                        <WhiteSpace size="lg"/>
                        <div className={styles.footer_link}>
                            <AgreeItem onChange={e => console.log('checkbox', e)} className="register_agree">
                                我已同意
                                <span className={styles.login_btn} onClick={this.showAgreement}>用户协议及隐私政策 </span>
                                <span className={styles.login_btn} onClick={this.toLogin}>直接登录</span>
                            </AgreeItem>
                        </div>
                        <WhiteSpace size="xl"/>       
                    </List>
                </div>
            </WingBlank>
        );
    }
}

export default connect(
    state=>({user: state.user}),
    {register}
)(Register)