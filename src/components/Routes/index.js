import React from 'react';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../../pages/Dashboard';
import Tickets from '../../pages/Tickets';
import Students from '../../pages/Students';
import Staff from '../../pages/Staff';
import Settings from '../../pages/Settings';
import MyProfile from '../../pages/MyProfile';
import Login from '../../pages/Login';

const Routes = () => {
    const routes = [
        {
            component: Login,
            path: '/login',
            exact: true
        }
    ];

    const privateRoutes = [
        {
            component: Dashboard,
            path: '/',
            exact: true
        },
        {
            component: Tickets,
            path: '/adeverinte',
            exact: true
        },
        {
            component: Students,
            path: '/studenti',
            exact: true
        },
        {
            component: Staff,
            path: '/staff',
            exact: true
        },
        {
            component: Settings,
            path: '/setari',
            exact: true
        },
        {
            component: MyProfile,
            path: '/profilul-meu',
            exact: true
        }
    ];

    return (
        <>
            {routes.map(({ path, component, exact }) => {
                return <PublicRoute key={path} path={path} component={component} exact={exact} />;
            })}
            {privateRoutes.map(({ path, component, exact }) => {
                return <PrivateRoute key={path} path={path} component={component} exact={exact} />;
            })}
        </>
    );
};

export default Routes;
