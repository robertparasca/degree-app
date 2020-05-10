import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';

const initialState = {
    staff: {},
    loading: false,
    errors: null,
    formData: {}
};

const staffViewSlice = createSlice({
    name: 'staffViewSlice',
    initialState,
    reducers: {
        fetchStaffLoading(state) {
            state.loading = true;
        },
        fetchStaffSuccess(state, { payload }) {
            state.staff = payload;
            state.formData = {
                ...payload.staff,
                email: payload.email
            };
            state.loading = false;
        },
        fetchStaffFail(state, { payload }) {
            state.loading = false;
            state.errors = payload;
        },
        clearState: () => initialState
    }
});

export const { fetchStaffFail, fetchStaffSuccess, fetchStaffLoading, clearState } = staffViewSlice.actions;

export const fetchStaff = (id) => async (dispatch) => {
    dispatch(fetchStaffLoading());

    try {
        const { data } = await axiosInstance.get(`${apiEndpoint}/${id}`);
        dispatch(fetchStaffSuccess(data));
    } catch (e) {
        dispatch(fetchStaffFail(e.response));
    }
};

export default staffViewSlice.reducer;
