import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn: false,
    hospitalIdNumber: undefined,
    name: undefined,
    surname: undefined,
    username: undefined,
    password: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS) {
        return defaultState;
    } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
        return {
            ...action.payload,
            isLoggedIn: true
        }
    } else if (action.type === ACTIONS.UPDATE_SUCCESS) {
        return {
            ...state,
            ...action.payload //It can be written like this instead of the code below
            // surname: action.payload.surname,
            // image: action.payload.image
        }
    }
    return state;
}

export default authReducer;