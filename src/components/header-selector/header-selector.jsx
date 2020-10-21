import React, { Component } from 'react';
import {List,Grid} from 'antd-mobile'

class HeaderSelector extends Component {
    constructor(props){
        super(props);
        this.headerList = [];
        this.state = {
            icon: null
        }
        for(let i=0;i<20;i++){
            this.headerList.push({
                text: '头像'+(i+1),
                icon: require(`../../assets/images/头像${i+1}.png`)
            })
        }

    }
    handleClick = ({text,icon})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }
    render() {
        const {icon} = this.state
        const headerTitle = !icon?'请选择头像':(
            <div>
                请选择头像：<img src={icon} alt="headerpic" />
            </div>
        );
        const hasLine = true;
        return (
            <List renderHeader={()=>headerTitle}>
                <Grid data={this.headerList} columnNum={5} hasLine={hasLine} onClick={this.handleClick}></Grid>
            </List>
        );
    }
}

export default HeaderSelector;