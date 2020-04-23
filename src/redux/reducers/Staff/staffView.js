import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

import { staffListMock } from './staff.mock';

const initialState = {
    staff: {},
    loading: false
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
            state.loading = false;
        },
        fetchStaffFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const { fetchStaffFail, fetchStaffSuccess, fetchStaffLoading, clearState } = staffViewSlice.actions;

export const fetchStaff = (id) => async (dispatch) => {
    dispatch(fetchStaffLoading());

    setTimeout(() => {
        const data = staffListMock.find((item) => item.id == id);
        dispatch(fetchStaffSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/staff');
    //     dispatch(fetchStaffSuccess(data));
    // } catch (e) {
    //     dispatch(fetchStaffFail(e.response));
    // }
};

export default staffViewSlice.reducer;
