import React from 'react';
import { NavBar, List } from 'antd-mobile';
import {
    AppOutline,
    ScanningOutline,
    SetOutline,
  } from 'antd-mobile-icons'

export default function Discover() {
    return (
        <div>
            <NavBar className="stick-top" backArrow={false}>发现</NavBar>
            <List>
                <List.Item prefix={<AppOutline />} onClick={() => {}}>
                    好友动态
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={() => {}}>
                    钱包
                </List.Item>
                <List.Item prefix={<ScanningOutline />} onClick={() => {}}>
                    扫一扫
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={() => {}}>
                    设置
                </List.Item>
            </List>
        </div>
    );
}