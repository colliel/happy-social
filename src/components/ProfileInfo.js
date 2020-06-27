import React from "react";
import {NavLink} from "react-router-dom";

export const ProfileInfo = ({user, ownProfile}) => {
    return(
        <div className="row">
            <div className="col">
                <span>Name: {user.displayName}</span><br/>
                <span>Email: {user.email}</span>
            </div>
            <div className="col ml-5">
                {ownProfile &&
                <NavLink className="nav-link" to="/editprofile">🖊</NavLink>}
            </div>
        </div>
    )
}