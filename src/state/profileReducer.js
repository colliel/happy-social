import {ANOTHER_PROFILE} from "./types";


const initialState = {
    another: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ANOTHER_PROFILE:
            return state = {...state, another: action.payload}
        default:
            return state
    }
}