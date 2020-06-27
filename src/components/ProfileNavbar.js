import React from "react";
import Posts from "./Posts";
import {Following} from "./Following";

export const ProfileNavbar = ({userId, ownProfile, following, followers}) => {
    return(
        <>
            <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                       aria-controls="home" aria-selected="true">Posts</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                       aria-controls="profile" aria-selected="false">Following</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                       aria-controls="contact" aria-selected="false">Followers</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <Posts userId={userId} ownProfile={ownProfile}/>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <Following userId={userId} following={following}/>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <Following userId={userId} following={followers}/>
                </div>
            </div>
        </>
    )
}
