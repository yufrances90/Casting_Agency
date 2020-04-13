import axios from 'axios';

const base_uri = 'http://localhost:5000';

let instance = axios.create({
    baseURL: base_uri,
    responseType: "json"
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default instance