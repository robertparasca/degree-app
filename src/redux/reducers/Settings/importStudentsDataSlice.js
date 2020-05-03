import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

const initialState = {
    importStudents: null,
    loading: false
};

const importStudentsDataSlice = createSlice({
    name: 'importStudentsDataSlice',
    initialState,
    reducers: {
        importStudentsLoading(state) {
            state.loading = true;
        },
        importStudentsSuccess(state, { payload }) {
            state.loading = false;
            state.institute = payload;
        },
        importStudentsFail(state) {
            state.loading = false;
        }
    }
});

export const { importStudentsFail, importStudentsSuccess, importStudentsLoading } = importStudentsDataSlice.actions;

export const importStudents = () => async (dispatch) => {
    dispatch(importStudentsLoading());

    setTimeout(() => {
        const data = {};
        dispatch(importStudentsSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/posts');
    //     dispatch(importStudentsSuccess(data));
    // } catch (e) {
    //     dispatch(importStudentsFail(e.response));
    // }
};

export default importStudentsDataSlice.reducer;
