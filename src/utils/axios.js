import axios from 'axios';

import config from './config';
import { removeToken } from 'app-utils/localStorageHelpers';

const axiosInstance = axios.create({
    baseURL: config.apiUrl
});

export const setToken = (token) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unsetToken = () => {
    axiosInstance.defaults.headers.common.Authorization = undefined;
};

export const setInterceptors = (store) => {
    axiosInstance.interceptors.response.use(null, function (error) {
        const { status } = error.response;
        if (status === 401) {
            store.dispatch({ type: 'DESTROY_SESSION' });
            removeToken();
            unsetToken();
        }
        return Promise.reject(error);
    });
};

export default axiosInstance;
