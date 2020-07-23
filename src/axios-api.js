import axios from 'axios';

const token = localStorage.getItem('myJwt');

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export default instance;