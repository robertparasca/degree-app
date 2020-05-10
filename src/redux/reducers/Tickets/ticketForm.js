import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';
import { fetchTicketsList } from 'app-reducers/Tickets/ticketsList';

const initialState = {
    ticket: {},
    loading: false,
    errors: null,
    success: false
};

const ticketFormSlice = createSlice({
    name: 'ticketFormSlice',
    initialState,
    reducers: {
        createTicketLoading(state) {
            state.loading = true;
        },
        createTicketSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        createTicketFail(state, { payload }) {
            state.loading = false;
            state.success = false;
            state.errors = payload;
        },
        clearState: () => initialState
    }
});

export const { createTicketFail, createTicketLoading, createTicketSuccess, clearState } = ticketFormSlice.actions;

export const createTicket = (form) => async (dispatch) => {
    dispatch(createTicketLoading());

    try {
        await axiosInstance.post(apiEndpoint, form);
        dispatch(createTicketSuccess());
        dispatch(fetchTicketsList({ page: 1 }));
    } catch (e) {
        dispatch(createTicketFail());
    }
};

export default ticketFormSlice.reducer;
