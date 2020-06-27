import React, {Component} from "react";
import Post from "./Post";
import {getPosts} from "../state/actions";
import {connect} from "react-redux";

class Posts extends Component {

    componentDidMount() {
        const { dispatch, hashid } = this.props
        dispatch(getPosts(hashid))
    }

    render(){
        return (
            this.props.posts.map(post => <Post post={post} key={post.id} all={this.props.ownProfile}/>)
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        hashid: ownProps.userId,
        posts: state.post.posts
    }
}


export default connect(mapStateToProps)(Posts)