import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from 'app-reducers/Tickets/constants';

const initialState = {
    ticketsList: [],
    pager: {},
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
            state.ticketsList = payload.data;
            state.pager = {
                current_page: payload.current_page,
                total: payload.total,
                per_page: payload.per_page
            };
        },
        fetchTicketsListFail(state) {
            state.loading = false;
        },
        deleteTicketLoading(state) {
            state.loading = true;
        },
        deleteTicketSuccess(state) {
            state.loading = false;
        },
        deleteTicketFail(state, { payload }) {
            state.loading = false;
            state.errorDelete = payload;
        },
        clearState: () => initialState
    }
});

export const {
    fetchTicketsListFail,
    fetchTicketsListSuccess,
    fetchTicketsListLoading,
    clearState,
    deleteTicketFail,
    deleteTicketLoading,
    deleteTicketSuccess
} = ticketsListSlice.actions;

export const fetchTicketsList = (params) => async (dispatch) => {
    dispatch(fetchTicketsListLoading());

    try {
        const requestParams = {
            page: params.page
        };
        const { data } = await axiosInstance.get(apiEndpoint, { params: requestParams });
        dispatch(fetchTicketsListSuccess(data));
    } catch (e) {
        dispatch(fetchTicketsListFail(e.response));
    }
};

export const deleteTicket = (id) => async (dispatch) => {
    dispatch(deleteTicketLoading());

    try {
        await axiosInstance.delete(`${apiEndpoint}/${id}`);
        dispatch(deleteTicketSuccess());
        dispatch(fetchTicketsList({ page: 1 }));
    } catch (e) {
        dispatch(deleteTicketFail());
    }
};

export default ticketsListSlice.reducer;
