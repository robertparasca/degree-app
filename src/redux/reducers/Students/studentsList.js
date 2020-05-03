import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

import { studentsListMock } from './students.mock';

const initialState = {
    studentsList: [],
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
            state.studentsList = payload;
        },
        fetchStudentsListFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const {
    fetchStudentsListFail,
    fetchStudentsListSuccess,
    fetchStudentsListLoading,
    clearState
} = studentsListSlice.actions;

export const fetchStudentsList = () => async (dispatch) => {
    dispatch(fetchStudentsListLoading());

    setTimeout(() => {
        const data = studentsListMock;
        dispatch(fetchStudentsListSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/staff');
    //     dispatch(fetchStudentsListSuccess(data));
    // } catch (e) {
    //     dispatch(fetchStudentsListFail(e.response));
    // }
};

export default studentsListSlice.reducer;
