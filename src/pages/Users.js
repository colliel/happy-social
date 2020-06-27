import React, {useEffect} from "react";
import {followUser, getAllUsers, getUserFromCookiesForFeed, unfollowUser} from "../state/actions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Loader} from "../components/Loader";

const Users = ({users, loading, hashid, dispatch}) => {

    useEffect(() => {
        dispatch(getUserFromCookiesForFeed())
            .then(hashidForFeed => dispatch(getAllUsers(hashidForFeed)))
        // eslint-disable-next-line
    }, [])

    const handleFollow = (fid, isFollowing) => {
        isFollowing ? dispatch(unfollowUser(hashid, fid)) : dispatch(followUser(hashid, fid))
    }

    return (
        <div className="profile">
            {loading ? <Loader/> :
                <>
                    <h1>Users</h1>
                    <ul className="list-group list-group-flush">
                        {users.map(user =>
                            (user.id !== hashid) &&
                            <li className="list-group-item user" key={user.id}>
                                <NavLink to={`profile/${user.id}`}>{user.name ? user.name : user.email}</NavLink>
                                <button
                                    className={`btn btn-${user.isFollowing ? 'danger' : 'primary'}`}
                                    onClick={() => handleFollow(user.id, user.isFollowing)}>
                                    {user.isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            </li>
                        )}
                    </ul>
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        hashid: state.userAuth.loggedUser.hashid,
        users: state.userAuth.allUsers,
        loading: state.userAuth.loading
    }
}

export default connect(mapStateToProps)(Users)