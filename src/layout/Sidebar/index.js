import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import menuItems from './menuItems';

const { Sider } = Layout;

const Sidebar = () => {
    const { user } = useSelector((state) => state.authSlice);
    const { location } = useSelector((state) => state.router);

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname]}>
                {menuItems.map(({ path, name, exact, roleRequired }) => {
                    if (roleRequired.indexOf(user.role) === -1) {
                        return null;
                    }
                    return (
                        <Menu.Item key={path}>
                            <UserOutlined />
                            <NavLink to={path} exact={exact}>
                                <span>{name}</span>
                            </NavLink>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
