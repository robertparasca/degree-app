import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

const initialState = {
    institute: null,
    loading: false
};

const instituteSlice = createSlice({
    name: 'instituteSlice',
    initialState,
    reducers: {
        fetchInstituteLoading(state) {
            state.loading = true;
        },
        fetchInstituteSuccess(state, { payload }) {
            state.loading = false;
            state.institute = payload;
        },
        fetchInstituteFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const { fetchInstituteFail, fetchInstituteSuccess, fetchInstituteLoading, clearState } = instituteSlice.actions;

export const fetchInstitute = () => async (dispatch) => {
    dispatch(fetchInstituteLoading());

    setTimeout(() => {
        const data = {
            university_name: 'Universitatea Tehnica Gheorghe Asachi',
            faculty_name: 'Facultatea de Automatica si Calculatoare',
            dean_name: 'Popescu Ion',
            secretary_name: 'Popescu Dan',
            active_year: '2019/2020'
        };
        dispatch(fetchInstituteSuccess(data));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/posts');
    //     dispatch(fetchInstituteSuccess(data));
    // } catch (e) {
    //     dispatch(fetchInstituteFail(e.response));
    // }
};

export default instituteSlice.reducer;
