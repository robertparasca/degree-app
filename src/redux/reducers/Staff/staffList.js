import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

import { staffListMock } from './staff.mock';

const initialState = {
    staffList: [],
    loading: false
};

const staffListSlice = createSlice({
    name: 'staffListSlice',
    initialState,
    reducers: {
        fetchStaffListLoading(state) {
            state.loading = true;
        },
        fetchStaffListSuccess(state, { payload }) {
            state.loading = false;
            state.staffList = payload;
        },
        fetchStaffListFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const { fetchStaffListFail, fetchStaffListSuccess, fetchStaffListLoading, clearState } = staffListSlice.actions;

export const fetchStaffList = () => async (dispatch) => {
    dispatch(fetchStaffListLoading());

    setTimeout(() => {
        const data = staffListMock;
        dispatch(fetchStaffListSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/staff');
    //     dispatch(fetchStaffListSuccess(data));
    // } catch (e) {
    //     dispatch(fetchStaffListFail(e.response));
    // }
};

export default staffListSlice.reducer;
