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
        }
    }
});

export const { fetchInstituteFail, fetchInstituteSuccess, fetchInstituteLoading } = instituteSlice.actions;

export const fetchInstitute = () => async (dispatch) => {
    dispatch(fetchInstituteLoading());

    setTimeout(() => {
        const data = {};
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
