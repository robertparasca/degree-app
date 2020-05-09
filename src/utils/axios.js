import axios from 'axios';

import config from './config';

const axiosInstance = axios.create({
    baseURL: config.apiUrl
});

export const setToken = (token) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unsetToken = () => {
    axiosInstance.defaults.headers.common.Authorization = undefined;
};

export default axiosInstance;
