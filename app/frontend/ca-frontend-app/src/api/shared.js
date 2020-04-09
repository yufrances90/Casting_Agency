import axios from 'axios';

const base_uri = 'http://localhost:5000';

export default axios.create({
    baseURL: base_uri,
    responseType: "json"
});
