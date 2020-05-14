import { createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios';
import { apiEndpoint } from './constants';
import { fetchTicketsList } from 'app-reducers/Tickets/ticketsList';

const initialState = {
    loading: false,
    errors: null,
    success: false,
    fileObject: null
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
        downloadTicketLoading(state) {
            state.loading = true;
        },
        downloadTicketSuccess(state, { payload }) {
            state.loading = false;
            state.success = true;
            // state.fileObject = payload;
        },
        downloadTicketFail(state) {
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
    rejectTicketSuccess,
    downloadTicketFail,
    downloadTicketLoading,
    downloadTicketSuccess
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
    dispatch(rejectTicketLoading());

    try {
        await axiosInstance.post(`${apiEndpoint}/reject/${form.id}`, form);
        dispatch(rejectTicketSuccess());
        dispatch(fetchTicketsList({ page: 1 }));
    } catch (e) {
        dispatch(rejectTicketFail());
    }
};

export const downloadTicket = (id) => async (dispatch) => {
    dispatch(downloadTicketLoading());

    try {
        const { data, headers } = await axiosInstance.get(`${apiEndpoint}/pdf/${id}`, {
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/pdf'
            }
        });

        let filename = headers['content-disposition'].split('="')[1];

        if (filename.endsWith('"')) {
            filename = filename.split('"')[0];
        }

        const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        dispatch(downloadTicketSuccess());
    } catch (e) {
        dispatch(downloadTicketFail());
    }
};

export default ticketActionsSlice.reducer;
