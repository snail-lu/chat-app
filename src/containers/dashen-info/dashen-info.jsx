import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile-v2';
import HeaderSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'

class DashenInfo extends Component {
    state = {
        header:'',                   //头像名称
        post:'',                     //职位
        info:'',                     //个人简介或职位要求
    }

    setHeader = (header)=>{
        this.setState({
            header
        })
    }
    handleChange = (name,value)=>{
        this.setState({
            [name]: value
        })
    }

    save = ()=>{
        // console.log(this.state)
        this.props.update(this.state)
    }
    render() {
        const {header,type} = this.props.user;
        if(header){
            const path = type==='boss'?'/boss':'/dashen';
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入期望职位" onChange={val=>{this.handleChange('post',val)}}>期望职位：</InputItem>
                <TextareaItem placeholder="请输入个人介绍" title="个人介绍：" rows={3} onChange={val=>{this.handleChange('info',val)}}/>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        );
    }
}

export default connect(
    state=>({user: state.user}),
    {update}
)(DashenInfo);