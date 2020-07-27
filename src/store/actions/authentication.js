import * as actionTypes from '../actionTypes';
import axios from '../../axios-api';

const logIn = (user) => {
    return {
        type: actionTypes.LOGIN_IN,
        payload: user
    }
}

export const authenticate = loginDetails => dispatch => {
    axios.post('/auth/login', { ...loginDetails })
        .then(res => {
            localStorage.setItem('myJwt', res.data.token);
            localStorage.setItem('currentUser', res.data.user._id);
            axios.defaults.headers.common['authorization'] = `Bearer ${res.data.token}`;
            dispatch(logIn(res.data.user))
        })
        .catch(err => {
            dispatch({
                type: actionTypes.LOGIN_FAILED,
            })
            console.log('AUTH FAILED DISMAL', err);
        })
}

export const logout = () => dispatch => {
    localStorage.clear();
    dispatch({ type: actionTypes.LOGOUT });
}

/** check if authenticated on reload or load
 *  and change the state to loggedIn = true
 */
export const checkAuth = () => dispatch => {
    // get token and user from localStorage
    const token = localStorage.getItem('myJwt');
    const currentUser = localStorage.getItem('currentUser');
    if (token) {
        //if there's a token and userId get user from database and add to state
        axios.get(`/users/${currentUser}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('myJwt')}` }
        })
            .then((res) => {
                axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
                dispatch(logIn(res.data.user));
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const updateUser = user => dispatch => {
    console.log(user);
    dispatch({
        type: actionTypes.UPDATE_USER,
        payload: user
    })
}