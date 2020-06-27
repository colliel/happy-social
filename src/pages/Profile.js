import React, {Component} from "react";
import {connect} from "react-redux";
import {getAnotherProfile, getFollowers, getFollowing} from "../state/actions";
import {ProfileInfo} from "../components/ProfileInfo";
import {ProfileNavbar} from "../components/ProfileNavbar";
import {Loader} from "../components/Loader";

class Profile extends Component {

    componentDidMount() {
        const userId = this.props.match.params.userId
        const dispatch = this.props.dispatch
            dispatch(getAnotherProfile(userId))
            .then(() => dispatch(getFollowing(userId)))
            .then(() => dispatch(getFollowers(userId)))
    }

    componentDidUpdate(prevProps) {
        const userId = this.props.match.params.userId
        const dispatch = this.props.dispatch
        if(userId !== prevProps.match.params.userId){
            dispatch(getAnotherProfile(userId))
                .then(() => dispatch(getFollowing(userId)))
                .then(() => dispatch(getFollowers(userId)))
        }
    }

    render(){
        return (
            <div className="profile">
                {this.props.loading ? <Loader/> :
                    <>
                        <h1>Profile</h1>
                        <ProfileInfo
                            user={this.props.user}
                            ownProfile={this.props.ownProfile}
                        />
                        <ProfileNavbar
                            userId={this.props.userId}
                            ownProfile={this.props.ownProfile}
                            following={this.props.following}
                            followers={this.props.followers}
                        />
                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const userId = ownProps.match.params.userId
    const ownProfile = (userId === state.userAuth.loggedUser.hashid)
    return {
        user: state.profile.another,
        loading: state.userAuth.loading,
        userId,
        ownProfile,
        following: state.userAuth.following,
        followers: state.userAuth.followers
    }
}

export default connect(
    mapStateToProps
)(Profile)