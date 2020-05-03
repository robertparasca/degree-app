import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { hasToken } from '../../utils/localStorageHelpers';

const PrivateRoute = ({ component: Component, roleRequired, ...rest }) => {
    const { user } = useSelector((state) => state.authSlice);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (hasToken() && user) {
                    if (roleRequired.indexOf(user.role) === -1) {
                        return <Redirect to='/404' />;
                    }
                    return <Component {...props} key={props.path} />;
                }
                return !hasToken() ? <Redirect to='/' /> : null;
            }}
        />
    );
};

export default PrivateRoute;
