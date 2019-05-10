import * as actionTypes from '../constants/actionTypes';
import { loadUserData } from '../utils/localStorage';

const initialState = {
    isAuthenticated: Boolean(loadUserData()),
    user: loadUserData()
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESSFUL:
            return { ...state, isAuthenticated: true, user: action.payload };

        case actionTypes.LOGIN_USER_FAILED:
            return { ...state, isAuthenticated: false, user: {} };
        
        case actionTypes.LOGOUT_USER:
            return { ...state, isAuthenticated: false, user: undefined };
        
        default:
            return state;
    }
}
