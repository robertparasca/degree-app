import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

const initialState = {
    importStudents: null,
    loading: false,
    importInfo: {
        studentImports: null,
        scholarshipImports: null
    },
    importScholarship: null
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
        },
        getImportInfo(state) {
            state.loading = true;
        },
        getImportInfoSuccess(state, { payload }) {
            state.loading = false;
            state.importInfo = {
                ...payload.data
            };
        },
        getImportInfoFail(state) {
            state.loading = false;
        },
        importScholarship(state) {
            state.loading = true;
        },
        importScholarshipSuccess(state) {
            state.loading = false;
        },
        importScholarshipFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const {
    importStudentsFail,
    importStudentsSuccess,
    importStudentsLoading,
    getImportInfo,
    getImportInfoFail,
    getImportInfoSuccess,
    importScholarship,
    importScholarshipFail,
    importScholarshipSuccess,
    clearState
} = importStudentsDataSlice.actions;

export const importStudentsAsync = ({ file, year }) => async (dispatch) => {
    dispatch(importStudentsLoading());
    const requestData = new FormData();
    requestData.append('year', year);
    requestData.append('file', file, file.name);
    try {
        const data = await axiosInstance.post('/students/import', requestData);
        dispatch(importStudentsSuccess(data));
        dispatch(getImportInfoAsync());
    } catch (e) {
        dispatch(importStudentsFail(e.response));
    }
};

export const getImportInfoAsync = () => async (dispatch) => {
    dispatch(getImportInfo());
    try {
        const data = await axiosInstance.get('/import-status');
        dispatch(getImportInfoSuccess(data));
    } catch (e) {
        dispatch(getImportInfoFail(e.response));
    }
};

export const importScholarshipAsync = ({ file }) => async (dispatch) => {
    dispatch(importScholarship());
    const requestData = new FormData();
    requestData.append('file', file, file.name);
    try {
        const data = await axiosInstance.post('/scholarships/import', requestData);
        dispatch(importScholarshipSuccess(data));
        dispatch(getImportInfoAsync());
    } catch (e) {
        dispatch(importScholarshipFail(e.response));
    }
};

export default importStudentsDataSlice.reducer;
