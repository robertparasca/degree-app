import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import dayjs from 'dayjs';

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

    try {
        const { data } = await axiosInstance.get('/institute');
        const institute = {
            ...data,
            start_date: dayjs(data.start_date),
            mid_date: dayjs(data.mid_date),
            end_date: dayjs(data.end_date)
        };
        dispatch(fetchInstituteSuccess(institute));
    } catch (e) {
        dispatch(fetchInstituteFail(e.response));
    }
};

export default instituteSlice.reducer;
