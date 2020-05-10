import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';

const initialState = {
    studentsList: [],
    pager: {},
    loading: false
};

const studentsListSlice = createSlice({
    name: 'studentsListSlice',
    initialState,
    reducers: {
        fetchStudentsListLoading(state) {
            state.loading = true;
        },
        fetchStudentsListSuccess(state, { payload }) {
            state.loading = false;
            state.studentsList = payload.data;
            state.pager = {
                current_page: payload.current_page,
                total: payload.total,
                per_page: payload.per_page
            };
        },
        fetchStudentsListFail(state) {
            state.loading = false;
        },
        deleteStudentLoading(state) {
            state.loading = true;
        },
        deleteStudentSuccess(state) {
            state.loading = false;
        },
        deleteStudentFail(state, { payload }) {
            state.loading = false;
            state.errorDelete = payload;
        },
        clearState: () => initialState
    }
});

export const {
    fetchStudentsListFail,
    fetchStudentsListSuccess,
    fetchStudentsListLoading,
    clearState,
    deleteStudentFail,
    deleteStudentLoading,
    deleteStudentSuccess
} = studentsListSlice.actions;

export const fetchStudentsList = (params) => async (dispatch) => {
    dispatch(fetchStudentsListLoading());

    try {
        const requestParams = {
            page: params.page
        };
        const { data } = await axiosInstance.get(apiEndpoint, { params: requestParams });
        dispatch(fetchStudentsListSuccess(data));
    } catch (e) {
        dispatch(fetchStudentsListFail(e.response));
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    dispatch(deleteStudentLoading());

    try {
        await axiosInstance.delete(`${apiEndpoint}/${id}`);
        dispatch(deleteStudentSuccess());
        dispatch(fetchStudentsList({ page: 1 }));
    } catch (e) {
        dispatch(deleteStudentFail());
    }
};

export default studentsListSlice.reducer;
