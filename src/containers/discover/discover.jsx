import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/actions';
import UserList from '../../components/user-list/user-list'
import { NavBar } from 'antd-mobile-v2';

class DaShen extends Component {
    componentDidMount() { 
        this.props.getUserList("boss") 
    }

    render() {
        return (
            <div>
                <NavBar className="stick-top">发现</NavBar>
                <UserList userList={this.props.userList} />
            </div>

        );
    }
}

export default connect(
    state=>({userList: state.userList}),
    {getUserList}
)(DaShen);