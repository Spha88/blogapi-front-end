import * as actionTypes from '../actionTypes';
import axios from '../../axios-api';

export const logIn = () => {
    return {
        type: actionTypes.LOGIN_IN
    }
}