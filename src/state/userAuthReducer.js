import {
    ADD_USERS_TO_STATE,
    GET_FOLLOWERS,
    GET_FOLLOWING, HIDE_LOADER,
    PROCESS_USER_DATA,
    SHOW_LOADER,
    TOGGLE_USER,
    USER_LOGOUT
} from "./types";

const initialState = {
    loggedUser: {email: '', displayName: '', hashid: '', idToken: ''},
    allUsers: [],
    loading: false,
    following: [],
    followers: []
}

export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return state = {...state, loading: true}
        case HIDE_LOADER:
            return state = {...state, loading: false}
        case PROCESS_USER_DATA:
            return state = {
                ...state,
                loggedUser: {
                    ...state.loggedUser,
                    email: action.users.email,
                    displayName: action.users.displayName,
                    hashid: action.users.hashid,
                    idToken: action.users.idToken
                },
                loading: false
            }
        case USER_LOGOUT:
            return state = {...state,
                loggedUser: {email: '', displayName: '', hashid: '', idToken: ''},
                following: [],
                followers: [],
                allUsers: []
            }
        case ADD_USERS_TO_STATE:
            return state = {...state, allUsers: action.payload, loading: false}
        case TOGGLE_USER:
            return state = {...state,
                allUsers: state.allUsers.map(user => (user.id === action.fid) ?
                    {...user, isFollowing: !user.isFollowing} : user)}
        case GET_FOLLOWING:
            return state = {...state, following: action.payload, loading: false}
        case GET_FOLLOWERS:
            return state = {...state, followers: action.payload, loading: false}
        default:
            return state;
    }
}