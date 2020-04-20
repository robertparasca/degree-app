import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import Container from '../Container';
import Routes from '../Routes';
import Sidebar from '../Sidebar';

const App = () => {
    const { user } = useSelector((state) => state.authSlice);

    return (
        <Layout id='app-container'>
            {user ? <Sidebar /> : null}
            <Container>
                <Routes />
            </Container>
        </Layout>
    );
};

export default App;
