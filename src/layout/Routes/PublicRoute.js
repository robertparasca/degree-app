import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isUserLoggedIn } = useSelector((state) => state.authSlice);

    return (
        <Route
            {...rest}
            render={(props) => {
                return isUserLoggedIn ? <Redirect to='/dashboard' /> : <Component {...props} key={props.path} />;
            }}
        />
    );
};

export default PublicRoute;
