import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { hasToken } from '../../utils/localStorageHelpers';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.authSlice);

    const canSee = hasToken() && user;

    return (
        <Route
            {...rest}
            render={(props) => {
                return canSee ? <Redirect to='/' /> : <Component {...props} key={props.path} />;
            }}
        />
    );
};

export default PublicRoute;
