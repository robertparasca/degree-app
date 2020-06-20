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
        importStudentsSuccess(state) {
            state.loading = false;
        },
        importStudentsFail(state) {
            state.loading = false;
        }
    }
});

export const { importStudentsFail, importStudentsSuccess, importStudentsLoading } = importStudentsDataSlice.actions;

export const importStudentsAsync = ({ file, year }) => async (dispatch) => {
    dispatch(importStudentsLoading());
    const requestData = new FormData();
    requestData.append('year', year);
    requestData.append('file', file, file.name);
    try {
        const data = await axiosInstance.post('/students/import', requestData);
        dispatch(importStudentsSuccess(data));
    } catch (e) {
        dispatch(importStudentsFail(e.response));
    }
};

export default importStudentsDataSlice.reducer;
