import React from "react";
import Posts from "./Posts";
import AddPost from "./AddPost";
import {connect} from "react-redux";

const Wall = ({hashid}) => {
    return (
        <div className="profile">
            <AddPost/>
            <Posts userId={hashid} ownProfile={true}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        hashid: state.userAuth.loggedUser.hashid
    }
}


export default connect(mapStateToProps)(Wall)