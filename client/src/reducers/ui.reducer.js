import * as actionTypes from '../constants/actionTypes';

const initialState = {
    currentModal: undefined,
    currentSnackbar: undefined
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return { ...state, currentModal: action.payload };
        
        case actionTypes.CLOSE_MODAL:
            return { ...state, currentModal: undefined };
        
        case actionTypes.OPEN_SNACKBAR:
            return { ...state, currentSnackbar: action.payload };
        
        case actionTypes.CLOSE_SNACKBAR:
            return { ...state, currentSnackbar: undefined };
        
        default:
            return state;
    }
};