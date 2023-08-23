import React from 'react';
import { NavBar, List, Modal } from 'antd-mobile';
import {
    AppOutline,
    ScanningOutline,
    SetOutline,
} from 'antd-mobile-icons'

export default function Discover() {
    const navigate = () => {
        Modal.alert({
            content: '人在天边月上明，等我开发完行不行',
            onConfirm: () => {
                console.log('Confirmed')
            },
        })
    }
    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>发现</NavBar>
            <List>
                <List.Item prefix={<AppOutline />} onClick={navigate}>
                    好友动态
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={navigate}>
                    钱包
                </List.Item>
                <List.Item prefix={<ScanningOutline />} onClick={navigate}>
                    扫一扫
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={navigate}>
                    设置
                </List.Item>
            </List>
        </div>
    );
}