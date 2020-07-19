import * as actionTypes from '../actionTypes';

const initialState = {
    loggedIn: false,
    authError: '',
    user: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_IN:
            return {
                ...state,
                loggedIn: true,
                user: action.payload,
                authError: ''
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                loggedIn: false,
                authError: "Incorrect email or password"
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                authError: ''
            }
        default: return state;
    }
}

export default reducer;