import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { push } from 'connected-react-router';

const initialState = {
    loading: false,
    errors: null
};

const activateAccountSlice = createSlice({
    name: 'activateAccountSlice',
    initialState,
    reducers: {
        activateAccountLoading(state) {
            state.loading = true;
        },
        activateAccountSuccess(state) {
            state.loading = false;
        },
        activateAccountFail(state, { payload }) {
            state.loading = false;
            state.errors = payload;
        },
        clearState: () => initialState
    }
});

export const {
    activateAccountLoading,
    activateAccountFail,
    activateAccountSuccess,
    clearState
} = activateAccountSlice.actions;

export const activateAccount = (values) => async (dispatch) => {
    dispatch(activateAccountLoading());

    try {
        const { data } = await axiosInstance.post('/activate-account', values);
        dispatch(activateAccountSuccess(data));
        dispatch(push('/'));
    } catch (e) {
        const {
            data: { errors }
        } = e.response;
        dispatch(activateAccountFail(errors));
    }
};
export default activateAccountSlice.reducer;
