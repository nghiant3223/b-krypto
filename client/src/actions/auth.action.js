import Axios from 'axios';

import * as actionTypes from  '../constants/actionTypes';
import { storeUserData } from '../utils/localStorage';

export function logInUser(username, password) {
    return async function (dispatch) {
        try {
            const { data: accessToken } = await Axios.get(`/api/user/login?username=${username}&password=${password}`);
            const user = { username, password, accessToken }
            storeUserData(user);
            alert('Login successfully');
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: user });
        } catch(e) {
            alert('Login failed');
            console.log(e);
            dispatch({ type: actionTypes.LOGIN_USER_FAILED });
        }
    }
}

export function logOutUser() {
    localStorage.clear();
    return { type: actionTypes.LOGOUT_USER };
}