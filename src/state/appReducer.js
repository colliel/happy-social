import {HIDE_ERROR, SHOW_ERROR} from "./types";

const initialState = {
    errorLogin: ''
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ERROR:
            return state = {...state, errorLogin: action.dataObject.message}
        case HIDE_ERROR:
            return state = {...state, errorLogin: ''}
        default:
            return state;
    }
}