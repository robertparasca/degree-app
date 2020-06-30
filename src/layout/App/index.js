import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Container from 'app-layout/Container';
import Routes from 'app-layout/Routes';
import Sidebar from 'app-layout/Sidebar';
import { hasToken, getToken } from 'app-utils/localStorageHelpers';
import { me } from 'app-reducers/Auth';
import menuItems from 'app-layout/Sidebar/menuItems';
import { setToken } from 'app-utils/axios';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const locations = [
    {
        name: 'Login',
        pathname: '/'
    }
];

const App = () => {
    const { user } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const { isUserLoggedIn, loading } = useSelector((state) => state.authSlice);
    const { location } = useSelector((state) => state.router);

    useEffect(() => {
        const currentPage = menuItems.find((item) => location.pathname.includes(item.path));

        if (currentPage) {
            document.title = currentPage.name;
            return;
        }

        const found = locations.find((item) => (item.pathname = location.pathname));
        if (found) {
            document.title = found.name;
        }

        return () => {
            document.title = 'Initial';
        };
    }, [location.pathname]);

    useEffect(() => {
        if (hasToken() && !user && !loading) {
            const token = getToken();
            setToken(token);
            dispatch(me(token));
        }
    }, []);

    if (loading) {
        return <Spin indicator={antIcon} />;
    }

    return (
        <Layout id='app-container'>
            {isUserLoggedIn ? <Sidebar /> : null}
            <Container>
                <Routes />
            </Container>
        </Layout>
    );
};

export default App;
