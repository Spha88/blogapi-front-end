import axios from 'axios';

const token = localStorage.getItem('myJwt');

const url = process.env.REACT_APP_API_BASE_URL || process.env.API_BASE;

const instance = axios.create({
    baseURL: url,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export default instance;