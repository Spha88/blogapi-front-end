import axios from 'axios';

const token = localStorage.getItem('myJwt');

let url

if (process.env.NODE_ENV === 'production') {
    url = process.env.REACT_APP_API_BASE_URL;
} else {
    url = process.env.REACT_APP_API_BASE_LOCAL;
}

const instance = axios.create({
    baseURL: url
});

export default instance;