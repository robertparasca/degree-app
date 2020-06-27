import React, { useState } from 'react';
import { Layout, Avatar, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutAsync } from 'app-reducers/Auth';

const { Header: AntdHeader } = Layout;

const Header = () => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);

    const menu = (
        <Menu>
            {/*<Menu.Item>*/}
            {/*    <Link to='/profilul-meu'>Profilul meu</Link>*/}
            {/*</Menu.Item>*/}
            <Menu.Item onClick={() => dispatch(logoutAsync())}>
                <span>Logout</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <AntdHeader className='site-layout-background header' style={{ padding: 0 }}>
            {/*{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
            {/*    className: 'trigger',*/}
            {/*    onClick: toggle*/}
            {/*})}*/}
            <section></section>
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar className='header-icon' size='small' icon={<UserOutlined />} />
            </Dropdown>
        </AntdHeader>
    );
};

export default Header;
