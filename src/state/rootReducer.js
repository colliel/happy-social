import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {userAuthReducer} from "./userAuthReducer";
import {postReducer} from "./postReducer";
import {profileReducer} from "./profileReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    userAuth: userAuthReducer,
    post: postReducer,
    profile: profileReducer
})