import * as actionTypes from '../constants/actionTypes';

const initialState = {
    currentModal: null
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return { ...state, currentModal: action.payload };
        
        case actionTypes.CLOSE_MODAL:
            return { ...state, currentModal: null };
        
        default:
            return state;
    }
};