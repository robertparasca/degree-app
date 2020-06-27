import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import dayjs from 'dayjs';
import config from 'app-utils/config';

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
            console.log(payload);
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

export const getChartData = () => async (dispatch) => {
    dispatch(getChartDataLoading());

    try {
        const { data } = await axiosInstance.get('/tickets/chart');
        const datesEmpty = new Array(7).fill('rand');
        const datesHalf = datesEmpty.reduce((acc, item, index) => {
            return [
                ...acc,
                dayjs()
                    .subtract(datesEmpty.length - index - 1, 'day')
                    .format(config.dateFormatClientWithoutHours)
            ];
        }, []);
        const tickets = datesHalf.reduce((acc, item) => {
            return [
                ...acc,
                {
                    name: item,
                    value: data.tickets[item] ? data.tickets[item].length : 0
                }
            ];
        }, []);
        const accepted = datesHalf.reduce((acc, item) => {
            return [
                ...acc,
                {
                    name: item,
                    value: data.accepted[item] ? data.accepted[item].length : 0
                }
            ];
        }, []);
        const rejected = datesHalf.reduce((acc, item) => {
            return [
                ...acc,
                {
                    name: item,
                    value: data.rejected[item] ? data.rejected[item].length : 0
                }
            ];
        }, []);
        const chartData = {
            tickets,
            accepted,
            rejected
        };
        console.log(chartData);
        dispatch(getChartDataSuccess(chartData));
    } catch (e) {
        const {
            data: { errors }
        } = e.response;
        dispatch(getChartDataFail(errors));
    }
};
export default dashboardSlice.reducer;
