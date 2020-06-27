import React from "react";
import {connect} from "react-redux";
import {isLikePost} from "../state/actions";

const Like = ({likes, hid, hashid, userid, dispatch, posts, feed}) => {
    const length = likes ? Object.keys(likes).length : 0
    const active = likes ? Object.keys(likes).find(i => likes[i] === hashid) : false

    const handleLikeClick = (hid, hashid, userid, feed) => {
        dispatch(isLikePost(hid, hashid, userid, feed))
    }

    return(
        <div className='like'>
            <button
                className={`like-toggle basic ${active && 'like-active'}`}
                onClick={() => handleLikeClick(hid, hashid, userid, feed)}
            >♥</button>
            <span className={`${!length && 'hidden'}`}>{length}</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts
    }
}

export default connect(mapStateToProps)(Like)