import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import Header from '../Header';

const { Content } = Layout;

const Container = (props) => {
    const { isUserLoggedIn } = useSelector((state) => state.authSlice);

    if (!isUserLoggedIn) {
        return props.children;
    }

    return (
        <Layout className='site-layout'>
            <Header />
            <Content
                className='site-layout-background'
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280
                }}
            >
                {props.children}
            </Content>
        </Layout>
    );
};

export default Container;
