import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';

import { ticketsListMock } from './tickets.mock';

const initialState = {
    ticketsList: [],
    loading: false
};

const ticketsListSlice = createSlice({
    name: 'ticketsListSlice',
    initialState,
    reducers: {
        fetchTicketsListLoading(state) {
            state.loading = true;
        },
        fetchTicketsListSuccess(state, { payload }) {
            state.loading = false;
            state.ticketsList = payload;
        },
        fetchTicketsListFail(state) {
            state.loading = false;
        },
        clearState: () => initialState
    }
});

export const {
    fetchTicketsListFail,
    fetchTicketsListSuccess,
    fetchTicketsListLoading,
    clearState
} = ticketsListSlice.actions;

export const fetchTicketsList = () => async (dispatch) => {
    dispatch(fetchTicketsListLoading());

    setTimeout(() => {
        dispatch(fetchTicketsListSuccess(ticketsListMock));
    }, 1000);
    // try {
    //     const data = await axiosInstance.get('/staff');
    //     dispatch(fetchTicketsListSuccess(data));
    // } catch (e) {
    //     dispatch(fetchTicketsListFail(e.response));
    // }
};

export default ticketsListSlice.reducer;
