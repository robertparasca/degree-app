import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';

const initialState = {
    staff: {},
    loading: false,
    errors: null,
    success: false
};

const staffFormSlice = createSlice({
    name: 'staffFormSlice',
    initialState,
    reducers: {
        createStaffLoading(state) {
            state.loading = true;
        },
        createStaffSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        createStaffFail(state, { payload }) {
            state.loading = false;
            state.errors = payload;
            state.success = false;
        },
        clearState: () => initialState
    }
});

export const { createStaffFail, createStaffLoading, createStaffSuccess, clearState } = staffFormSlice.actions;

export const createStaff = (form) => async (dispatch) => {
    dispatch(createStaffLoading());

    setTimeout(() => {
        dispatch(createStaffSuccess());
    }, 1000);

    // try {
    //     await axiosInstance.post(apiEndpoint, form);
    //     dispatch(createStaffSuccess());
    // } catch (e) {
    //     dispatch(createStaffFail(e.response));
    // }
};

export const updateStaff = (form) => async (dispatch) => {
    dispatch(createStaffLoading());

    setTimeout(() => {
        dispatch(createStaffSuccess());
    }, 1000);

    // try {
    //     await axiosInstance.put(`${apiEndpoint}/${form.id}`, form);
    //     dispatch(createStaffSuccess());
    // } catch (e) {
    //     dispatch(createStaffFail(e.response));
    // }
};

export default staffFormSlice.reducer;
