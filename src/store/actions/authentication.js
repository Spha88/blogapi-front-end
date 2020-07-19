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
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));
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
    localStorage.removeItem('myJwt');
    localStorage.removeItem('currentUser');
    dispatch({ type: actionTypes.LOGOUT });
}

/** check if authenticated on reload or load
 *  and change the state to loggedIn = true
 */
export const checkAuth = () => dispatch => {
    // get token and user from localStorage
    const token = localStorage.getItem('myJwt');
    const user = localStorage.getItem('currentUser');

    // If token is not null, user is logged in get store in state
    if (token) dispatch(logIn(JSON.parse(user)));
}