import React, {useEffect} from "react";
import Post from "../components/Post";
import {connect} from "react-redux";
import {getFollowingPosts, getUserFromCookiesForFeed} from "../state/actions";
import {Loader} from "../components/Loader";

const Feed = ({dispatch, posts, hashid, loading}) => {

    useEffect(() => {
        dispatch(getUserFromCookiesForFeed())
            .then(hashidForFeed => dispatch(getFollowingPosts(hashidForFeed)))
        // eslint-disable-next-line
    },[])

    return(
        <div className="profile">
            {loading ? <Loader/> :
                <>
                    <h1>Feed</h1>
                    {posts.map(post => <Post post={post} key={post.id} all={false}/>)}
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.allPosts,
        hashid: state.userAuth.loggedUser.hashid,
        loading: state.userAuth.loading
    }
}

export default connect(mapStateToProps)(Feed)