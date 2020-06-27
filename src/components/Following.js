import React from "react";
import {NavLink} from "react-router-dom";

export const Following = ({following}) => {
    return (
        <ul className="list-group list-group-flush">
            {
                following.map(user =>
                <li className="list-group-item user" key={user.hashid}>
                    <NavLink to={`/profile/${user.hashid}`}>{user.displayName}</NavLink>
                </li>
            )}
        </ul>
    )
}
