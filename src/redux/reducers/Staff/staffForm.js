import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';
import { fetchStaffList } from 'app-reducers/Staff/staffList';

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
            state.success = false;
            state.errors = payload;
        },
        clearState: () => initialState
    }
});

export const { createStaffFail, createStaffLoading, createStaffSuccess, clearState } = staffFormSlice.actions;

export const createStaff = (form) => async (dispatch) => {
    dispatch(createStaffLoading());

    try {
        await axiosInstance.post(apiEndpoint, form);
        dispatch(createStaffSuccess());
        dispatch(fetchStaffList({ page: 1 }));
    } catch (e) {
        dispatch(createStaffFail());
    }
};

export const updateStaff = (form) => async (dispatch) => {
    dispatch(createStaffLoading());

    try {
        await axiosInstance.put(`${apiEndpoint}/${form.id}`, form);
        dispatch(createStaffSuccess());
        dispatch(fetchStaffList({ page: 1 }));
    } catch (e) {
        dispatch(createStaffFail(e.response.data.errors));
    }
};

export default staffFormSlice.reducer;
