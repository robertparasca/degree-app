import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
    const { location } = useSelector((state) => state.router);

    const menuItems = [
        {
            name: 'Acasa',
            path: '/dashboard',
            exact: true
        },
        {
            name: 'Adeverinte',
            path: '/adeverinte',
            exact: true
        },
        {
            name: 'Studenti',
            path: '/studenti',
            exact: true
        },
        {
            name: 'Staff',
            path: '/staff',
            exact: true
        },
        {
            name: 'Setari',
            path: '/setari',
            exact: true
        }
    ];

    return (
        <Sider trigger={null} collapsible collapsed={false}>
            <div className='logo' />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname]}>
                {menuItems.map(({ path, name, exact }) => {
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
