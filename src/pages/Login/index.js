import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/reducers/Auth';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const { isUserLoggedIn } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();

    if (isUserLoggedIn) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <section>
            <h1>Login</h1>
            <button onClick={() => dispatch(login())}>login</button>
        </section>
    );
};

export default Login;
