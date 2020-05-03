import React from 'react';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../../pages/Dashboard';
import Tickets from '../../pages/Tickets';
import Students from '../../pages/Students';
import StudentView from '../../pages/Students/StudentView';
import StudentForm from '../../pages/Students/StudentForm';
import StaffList from '../../pages/Staff/StaffList';
import StaffView from '../../pages/Staff/StaffView';
import StaffForm from '../../pages/Staff/StaffForm';
import Settings from '../../pages/Settings';
import MyProfile from '../../pages/MyProfile';
import Login from '../../pages/Login';

import config from '../../utils/config';

const { STAFF, STUDENT } = config.roles;

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
            exact: true,
            roleRequired: [STAFF, STUDENT]
        },
        {
            component: Tickets,
            path: '/cereri',
            exact: true,
            roleRequired: [STAFF, STUDENT]
        },
        {
            component: Students,
            path: '/studenti',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: StaffList,
            path: '/staff',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: Settings,
            path: '/setari',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: MyProfile,
            path: '/profilul-meu',
            exact: true,
            roleRequired: [STAFF, STUDENT]
        },
        {
            component: StaffView,
            path: '/staff/vizualizare/:id',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: StaffForm,
            path: '/staff/:id',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: StudentView,
            path: '/studenti/vizualizare/:id',
            exact: true,
            roleRequired: [STAFF]
        },
        {
            component: StudentForm,
            path: '/studenti/:id',
            exact: true,
            roleRequired: [STAFF]
        }
    ];

    return (
        <>
            {privateRoutes.map(({ path, component, exact, roleRequired }) => {
                return (
                    <PrivateRoute
                        key={path}
                        path={path}
                        component={component}
                        exact={exact}
                        roleRequired={roleRequired}
                    />
                );
            })}
            {routes.map(({ path, component, exact }) => {
                return <PublicRoute key={path} path={path} component={component} exact={exact} />;
            })}
        </>
    );
};

export default Routes;
