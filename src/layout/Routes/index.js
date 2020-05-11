import React from 'react';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from 'app-pages/Dashboard';
import Tickets from 'app-pages/Tickets';
import StudentsList from 'app-pages/Students/StudentsLIst';
import StudentView from 'app-pages/Students/StudentView';
import StudentForm from 'app-pages/Students/StudentForm';
import StaffList from 'app-pages/Staff/StaffList';
import StaffView from 'app-pages/Staff/StaffView';
import StaffForm from 'app-pages/Staff/StaffForm';
import Settings from 'app-pages/Settings';
import MyProfile from 'app-pages/MyProfile';
import Login from 'app-pages/Login';

import config from 'app-utils/config';
import ActivateAccount from 'app-pages/ActivateAccount';

const { STAFF, STUDENT } = config.roles;

const Routes = () => {
    const routes = [
        {
            component: Login,
            path: '/',
            exact: true
        },
        {
            component: ActivateAccount,
            path: '/activate-account',
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
            component: StudentsList,
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
