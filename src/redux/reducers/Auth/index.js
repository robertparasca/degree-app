import { createSlice } from '@reduxjs/toolkit';

import axiosInstance, { unsetToken, setToken } from '../../../utils/axios';
import { removeToken, saveToken } from '../../../utils/localStorageHelpers';

const initialState = {
    user: null,
    isUserLoggedIn: null,
    loading: false
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
            state.user = payload.user;
            state.isUserLoggedIn = true;
            saveToken(payload.token);
            setToken(payload.token);
        },
        loginFail(state) {
            state.loading = false;
        },
        clearAuth(state) {
            state.user = null;
        },
        logout(state) {
            state.user = null;
            state.isUserLoggedIn = false;
            removeToken();
            unsetToken();
        },
        meLoading(state) {
            state.loading = true;
        },
        meLoadingSuccess(state, { payload }) {
            state.loading = false;
            state.user = payload.user;
            state.isUserLoggedIn = true;
            saveToken(payload.token);
            setToken(payload.token);
        },
        meLoadingFail(state) {
            state.loading = false;
        }
    }
});

export const {
    loginFail,
    loginSuccess,
    loginLoading,
    clearAuth,
    logout,
    meLoading,
    meLoadingFail,
    meLoadingSuccess
} = authSlice.actions;

export const login = (values) => async (dispatch) => {
    dispatch(loginLoading());

    console.log(values);

    setTimeout(() => {
        const data = {
            user: { name: 'Robert' },
            token: 'blah'
        };
        dispatch(loginSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/posts');
    //     dispatch(loginSuccess(data));
    // } catch (e) {
    //     dispatch(loginFail(e.response));
    // }
};

export const googleLogin = (values) => async (dispatch) => {
    console.log(values);
};

export const me = () => async (dispatch) => {
    dispatch(meLoading());

    setTimeout(() => {
        const data = {
            user: { name: 'Robert', role: 'staff' },
            token: 'blah'
        };
        dispatch(meLoadingSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/posts');
    //     dispatch(loginSuccess(data));
    // } catch (e) {
    //     dispatch(loginFail(e.response));
    // }
};

export default authSlice.reducer;
