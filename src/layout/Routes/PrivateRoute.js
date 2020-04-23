import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { hasToken } from '../../utils/localStorageHelpers';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => state.authSlice);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (hasToken() && user) {
                    return <Component {...props} key={props.path} />;
                }
                return !hasToken() ? <Redirect to='/' /> : null;
            }}
        />
    );
};

export default PrivateRoute;
