import React from 'react';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../../pages/Dashboard';
import Tickets from '../../pages/Tickets';
import Students from '../../pages/Students';
import StaffList from '../../pages/Staff/StaffList';
import StaffView from '../../pages/Staff/StaffView';
import Settings from '../../pages/Settings';
import MyProfile from '../../pages/MyProfile';
import Login from '../../pages/Login';

const Routes = () => {
    const routes = [
        {
            component: Login,
            path: '/',
            exact: true
        }
    ];

    const privateRoutes = [
        {
            component: Dashboard,
            path: '/dashboard',
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
            component: StaffList,
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
        },
        {
            component: StaffView,
            path: '/staff/view/:id',
            exact: true
        }
    ];

    return (
        <>
            {privateRoutes.map(({ path, component, exact }) => {
                return <PrivateRoute key={path} path={path} component={component} exact={exact} />;
            })}
            {routes.map(({ path, component, exact }) => {
                return <PublicRoute key={path} path={path} component={component} exact={exact} />;
            })}
        </>
    );
};

export default Routes;
