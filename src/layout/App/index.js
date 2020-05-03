import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Container from '../Container';
import Routes from '../Routes';
import Sidebar from '../Sidebar';
import { hasToken, getToken } from '../../utils/localStorageHelpers';
import { me } from '../../redux/reducers/Auth';
import menuItems from '../Sidebar/menuItems';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const App = () => {
    const { user } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const { isUserLoggedIn, loading } = useSelector((state) => state.authSlice);
    const { location } = useSelector((state) => state.router);

    useEffect(() => {
        const currentPage = menuItems.find((item) => item.path === location.pathname);

        if (currentPage) {
            document.title = currentPage.name;
        }
        return () => {
            document.title = 'Initial';
        };
    }, [location.pathname]);

    if (hasToken() && !user && !loading) {
        const token = getToken();
        dispatch(me(token));
    }

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
