import * as actionTypes from '../actionTypes';

const initialState = {
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_IN:
            return {
                ...state,
                loggedIn: true
            }
        default: return state;
    }
}

export default reducer;