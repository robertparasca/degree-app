import { createSlice } from '@reduxjs/toolkit';

import axiosInstance, { unsetToken, setToken } from '../../../utils/axios';
import { removeToken, saveToken } from '../../../utils/localStorageHelpers';

import { setIsRoleProps } from './helpers';

const initialState = {
    user: null,
    isUserLoggedIn: null,
    loading: false,
    loginErrors: null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loginLoading(state) {
            state.loading = true;
        },
        loginSuccess(state, { payload }) {
            state.loading = false;
            state.user = setIsRoleProps(payload.user);
            state.isUserLoggedIn = true;
            state.loginErrors = null;
            saveToken(payload.access_token);
            setToken(payload.access_token);
        },
        loginFail(state, { payload }) {
            state.loading = false;
            state.loginErrors = payload;
        },
        clearAuth(state) {
            state.user = null;
        },
        logout(state) {
            state.user = null;
            state.isUserLoggedIn = false;
            state.loading = false;
            removeToken();
            unsetToken();
        },
        meLoading(state) {
            state.loading = true;
        },
        meLoadingFail(state) {
            state.loading = false;
        },
        meSuccess(state, { payload }) {
            state.loading = false;
            state.user = setIsRoleProps(payload);
            state.isUserLoggedIn = true;
            state.loginErrors = null;
        }
    }
});

export const { loginFail, loginSuccess, loginLoading, clearAuth, logout, meLoading, meSuccess } = authSlice.actions;

export const login = (values) => async (dispatch) => {
    dispatch(loginLoading());

    try {
        const { data } = await axiosInstance.post('/login', values);
        dispatch(loginSuccess(data));
    } catch (e) {
        const {
            data: { errors }
        } = e.response;
        dispatch(loginFail(errors));
    }
};

export const me = () => async (dispatch) => {
    dispatch(meLoading());

    try {
        const { data } = await axiosInstance.get('/me');
        console.log(data);
        dispatch(meSuccess(data));
    } catch (e) {
        dispatch(loginFail(e.response));
    }
};

export const logoutAsync = () => async (dispatch) => {
    dispatch(meLoading());

    try {
        await axiosInstance.get('/logout');
        dispatch(logout());
    } catch (e) {
        dispatch(logout());
    }
};

export const googleLogin = (values) => async (dispatch) => {
    console.log(values);
};

export default authSlice.reducer;
