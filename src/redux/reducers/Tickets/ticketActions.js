import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';
import { fetchTicketsList } from 'app-reducers/Tickets/ticketsList';

const initialState = {
    loading: false,
    errors: null,
    success: false
};

const ticketActionsSlice = createSlice({
    name: 'ticketActionsSlice',
    initialState,
    reducers: {
        validateTicketLoading(state) {
            state.loading = true;
        },
        validateTicketSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        validateTicketFail(state) {
            state.loading = false;
            state.success = false;
            state.errors = true;
        },
        rejectTicketLoading(state) {
            state.loading = true;
        },
        rejectTicketSuccess(state) {
            state.loading = false;
            state.success = true;
        },
        rejectTicketFail(state) {
            state.loading = false;
            state.success = false;
            state.errors = true;
        },
        clearState: () => initialState
    }
});

export const {
    validateTicketFail,
    validateTicketLoading,
    validateTicketSuccess,
    clearState,
    rejectTicketFail,
    rejectTicketLoading,
    rejectTicketSuccess
} = ticketActionsSlice.actions;

export const validateTicket = (form) => async (dispatch) => {
    dispatch(validateTicketLoading());

    try {
        await axiosInstance.post(`${apiEndpoint}/validate/${form.id}`, form);
        dispatch(validateTicketSuccess());
        dispatch(fetchTicketsList({ page: 1 }));
    } catch (e) {
        dispatch(validateTicketFail());
    }
};

export const rejectTicket = (form) => async (dispatch) => {
    dispatch(validateTicketLoading());

    try {
        await axiosInstance.post(`${apiEndpoint}/reject/${form.id}`, form);
        dispatch(validateTicketSuccess());
        dispatch(fetchTicketsList({ page: 1 }));
    } catch (e) {
        dispatch(validateTicketFail());
    }
};

export default ticketActionsSlice.reducer;
