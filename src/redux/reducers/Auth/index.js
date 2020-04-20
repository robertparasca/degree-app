import { createSlice } from '@reduxjs/toolkit';

import axiosInstance, { unsetToken } from '../../../utils/axios';
import { removeToken } from '../../../utils/localStorageHelpers';

const initialState = {
    user: { name: 'Robert' },
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
            state.user = {};
        },
        loginFail(state) {
            state.loading = false;
        },
        clearAuth(state) {
            state.user = null;
        },
        logout(state) {
            state.user = null;
            removeToken();
            unsetToken();
        }
    }
});

export const { loginFail, loginSuccess, loginLoading, clearAuth, logout } = authSlice.actions;

export const login = () => async (dispatch) => {
    dispatch(loginLoading());
    try {
        const data = await axiosInstance.get('/posts');
        dispatch(loginSuccess(data));
    } catch (e) {
        dispatch(loginFail(e.response));
    }
};

export default authSlice.reducer;
