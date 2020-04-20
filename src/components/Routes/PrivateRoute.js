import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { hasToken } from '../../utils/localStorageHelpers';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.authSlice);

    const canSee = hasToken() && user;
    console.log(hasToken(), user);
    return (
        <Route
            {...rest}
            render={(props) => {
                return canSee ? <Component {...props} key={props.path} /> : <Redirect to='/login' />;
            }}
        />
    );
};

export default PrivateRoute;
