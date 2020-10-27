import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/actions';
import UserList from '../../components/user-list/user-list';
import { NavBar } from 'antd-mobile';


class Job extends Component {
    constructor(props){
        super(props)
        this.state = {
            navTitle: '职位'
        }
    }
    componentDidMount() { 
        this.props.getUserList("boss")
    }

    render() {
        const { navTitle } = this.state;
        return (
            <div>
                <NavBar className="stick-top">{navTitle}</NavBar>
                <UserList userList={this.props.userList} />
            </div>
        );
    }
}

export default connect(
    state=>({userList: state.userList}),
    {getUserList}
)(Job);