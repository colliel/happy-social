import React from "react";
import {connect} from "react-redux";
import {removePost} from "../state/actions";
import Like from "./Like";

const Post = ({post, hashid, dispatch, all}) => {
    function timestampToDate(ts) {
        let d = new Date();
        d.setTime(ts);
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear() + '   ' + ('0' + d.getHours()).slice(-2) + '.' + ('0' + d.getMinutes()).slice(-2);
    }

    return (
        <div className="card border-light mb-3" style={{maxWidth: '100%'}}>
            <div className="card-header card-add">
                {timestampToDate(post.id)}
                {post.userName && ' - '} {post.userName}
                {all &&
                <button type="button"
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(removePost(hashid, post.hid))}
                >&times;</button>
                }
            </div>
            <div className="card-body">
                <p className="card-text">{post.text}</p>
                <Like likes={post.likes} hid={post.hid} hashid={hashid} userid={post.userid} feed={post.feed}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        hashid: state.userAuth.loggedUser.hashid
    }
}


export default connect(mapStateToProps)(Post)