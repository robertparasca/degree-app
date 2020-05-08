import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';

import { staffListMock } from './staff.mock';

const initialState = {
    staffList: [],
    loading: false,
    errorDelete: null
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
        deleteStaffLoading(state) {
            state.loading = true;
        },
        deleteStaffSuccess(state) {
            state.loading = false;
        },
        deleteStaffFail(state, { payload }) {
            state.loading = false;
            state.errorDelete = payload;
        },
        clearState: () => initialState
    }
});

export const {
    fetchStaffListFail,
    fetchStaffListSuccess,
    fetchStaffListLoading,
    deleteStaffFail,
    deleteStaffLoading,
    deleteStaffSuccess,
    clearState
} = staffListSlice.actions;

export const fetchStaffList = (params) => async (dispatch) => {
    dispatch(fetchStaffListLoading());

    console.log(params);

    setTimeout(() => {
        const data = staffListMock;
        dispatch(fetchStaffListSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get(apiEndpoint);
    //     dispatch(fetchStaffListSuccess(data));
    // } catch (e) {
    //     dispatch(fetchStaffListFail(e.response));
    // }
};

export const deleteStaff = (id) => async (dispatch) => {
    dispatch(deleteStaffLoading());

    setTimeout(() => {
        dispatch(deleteStaffSuccess());
        dispatch(fetchStaffList());
    }, 1000);
    // try {
    //     await axiosInstance.delete(`${apiEndpoint}/${id}`);
    //     dispatch(deleteStaffSuccess());
    //     dispatch(fetchStaffList());
    // } catch (e) {
    //     dispatch(fetchStaffListFail(e.response));
    // }
};

export default staffListSlice.reducer;
