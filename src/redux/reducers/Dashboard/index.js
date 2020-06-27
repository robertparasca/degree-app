import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import dayjs from 'dayjs';
import config from 'app-utils/config';
import { responseHandlerAdmin } from 'app-reducers/Dashboard/admin';
import { responseHandlerStudent } from 'app-reducers/Dashboard/student';

const initialState = {
    loading: false,
    errors: null,
    chartData: {
        tickets: null,
        accepted: null,
        rejected: null
    }
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        getChartDataLoading(state) {
            state.loading = true;
        },
        getChartDataSuccess(state, { payload }) {
            state.loading = false;
            state.chartData = payload;
        },
        getChartDataFail(state, { payload }) {
            state.loading = false;
            state.errors = payload;
        },
        clearState: () => initialState
    }
});

export const { getChartDataLoading, getChartDataFail, getChartDataSuccess, clearState } = dashboardSlice.actions;

export const getChartData = (isAdmin) => async (dispatch) => {
    dispatch(getChartDataLoading());
    const url = isAdmin ? 'chart-admin' : 'chart-student';
    try {
        const { data } = await axiosInstance.get(`/tickets/${url}`);
        const chartData = isAdmin ? responseHandlerAdmin(data) : responseHandlerStudent(data);
        dispatch(getChartDataSuccess(chartData));
    } catch (e) {
        const {
            data: { errors }
        } = e.response;
        dispatch(getChartDataFail(errors));
    }
};
export default dashboardSlice.reducer;
