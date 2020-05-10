import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';

import { staffListMock } from './staff.mock';

const initialState = {
    staffList: [],
    pager: {},
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
            state.staffList = payload.data;
            state.pager = {
                current_page: payload.current_page,
                total: payload.total,
                per_page: payload.per_page
            };
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

    try {
        const requestParams = {
            page: params.page
        };
        const { data } = await axiosInstance.get(apiEndpoint, { params: requestParams });
        dispatch(fetchStaffListSuccess(data));
    } catch (e) {
        dispatch(fetchStaffListFail(e.response));
    }
};

export const deleteStaff = (id) => async (dispatch) => {
    dispatch(deleteStaffLoading());

    try {
        await axiosInstance.delete(`${apiEndpoint}/${id}`);
        dispatch(deleteStaffSuccess());
        dispatch(fetchStaffList({ page: 1 }));
    } catch (e) {
        dispatch(deleteStaffFail());
    }
};

export default staffListSlice.reducer;
