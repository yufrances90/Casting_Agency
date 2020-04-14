import axios from 'axios';

import toast from '../toolkits/toast';

const base_uri = 'http://localhost:5000';

let instance = axios.create({
    baseURL: base_uri,
    responseType: "json"
});

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            toast.error(error.response.data.message);
        }
    }
)

export default instance