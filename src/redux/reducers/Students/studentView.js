import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from 'app-reducers/Students/constants';

const initialState = {
    student: {},
    loading: false
};

const studentViewSlice = createSlice({
    name: 'studentViewSlice',
    initialState,
    reducers: {
        fetchStudentLoading(state) {
            state.loading = true;
        },
        fetchStudentSuccess(state, { payload }) {
            state.student = payload;
            state.loading = false;
        },
        fetchStudentFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const { fetchStudentFail, fetchStudentSuccess, fetchStudentLoading, clearState } = studentViewSlice.actions;

export const fetchStudent = (id) => async (dispatch) => {
    dispatch(fetchStudentLoading());

    try {
        const { data } = await axiosInstance.get(`${apiEndpoint}/${id}`);
        dispatch(fetchStudentSuccess(data));
    } catch (e) {
        dispatch(fetchStudentFail(e.response));
    }
};

export default studentViewSlice.reducer;
