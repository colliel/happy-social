import Cookies from 'js-cookie'
import {
    ADD_POST_TO_STATE,
    ADD_USERS_TO_STATE,
    ANOTHER_PROFILE,
    CLEAR_POSTS,
    FETCH_ALLPOSTS,
    FETCH_POSTS,
    GET_FOLLOWERS,
    GET_FOLLOWING,
    HIDE_ERROR,
    HIDE_LOADER,
    PROCESS_USER_DATA,
    REMOVE_POST,
    SHOW_ERROR,
    SHOW_LOADER,
    TOGGLE_LIKE,
    TOGGLE_USER,
    USER_LOGOUT
} from "./types";

const url = process.env.REACT_APP_BD_URL

export const processUserData = users => {
    return {
        type: PROCESS_USER_DATA,
        users
    }
}

export const showError = dataObject => {
    return {
        type: SHOW_ERROR,
        dataObject
    }
}

const apiKey='AIzaSyC_FoRIg_R5s-qFJfdzMOvkbfaCL0fGpkU'

export const getUserFromCookies = () => {
    return async dispatch => {
        await dispatch({type: SHOW_LOADER})
        const hashid = await Cookies.get('hashid')
        if (hashid){
            const idToken = await Cookies.get('idToken')
            const email = await Cookies.get('email')
            const displayName = await Cookies.get('displayName')
            await dispatch(processUserData({hashid, idToken, email, displayName}))
            await dispatch({type: HIDE_LOADER})
        } else {
            await dispatch({type: HIDE_LOADER})
        }
    }
}

export const getUserFromCookiesForFeed = () => {
    return async dispatch => {
        const hashid = await Cookies.get('hashid')
        if (hashid){
            return hashid
        } else {
            return null
        }
    }
}

export const fetchLogin = (newLogin) => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER})
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify(newLogin),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    dispatch({type: HIDE_ERROR})
                    //Cookies.set('idToken', data.idToken, {expires: 10})
                    return dispatch(getUserProfile(data.idToken))
                }
                else {
                    return dispatch(showError(data.error))
                }
            })
    }
}

export const getUserProfile = idToken => {
    return (dispatch) => {
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({idToken}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => dispatch(addHashToUser(idToken, data.users[0].email, data.users[0].displayName)))
    }
}

export const addHashToUser = (idToken, email, displayName) => {
    return dispatch => {
        return fetch(`${url}/users.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                const hashid = Object.keys(data).find(key => data[key].email === email)
                return {idToken, email, hashid, displayName}
            })
            .then(data => dispatch(dataToCookies(data)))
            .then(obj => dispatch(processUserData(obj)))
    }
}

export const dataToCookies = (obj) => {
    return async () => {
        await Cookies.set('idToken', obj.idToken, {expires: 10})
        await Cookies.set('email', obj.email, {expires: 10})
        await Cookies.set('hashid', obj.hashid, {expires: 10})
        await Cookies.set('displayName', obj.displayName, {expires: 10})
        return obj
    }
}

export const removeUserFromCookies = () => {
    return async dispatch => {
        await Cookies.remove('idToken')
        await Cookies.remove('email')
        await Cookies.remove('hashid')
        await Cookies.remove('displayName')
        await dispatch(userLogout())
        return dispatch({type: CLEAR_POSTS})
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const addPost = post => {
    return (dispatch, getState) => {
        const hashid = getState().userAuth.loggedUser.hashid
        return fetch(`${url}/posts/${hashid}.json`, {
            method: 'POST',
            body: JSON.stringify({
                post
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => data.name)
            .then(name => dispatch({type: ADD_POST_TO_STATE, payload: {...post, hid: name, userid: hashid, feed: false}}))
    }
}

export const getPosts = hashid => {
    return (dispatch) => {
            return fetch(`${url}/posts/${hashid}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    if (data) {
                        const keys = Object.keys(data)
                        return keys.map(key => {
                            return {
                                ...data[key].post,
                                hid: key,
                                userid: hashid,
                                feed: false
                            }
                        })
                    } else {
                        return []
                    }
                })
                .then(arr => dispatch({type: FETCH_POSTS, payload: arr}))
            }
}

export const removePost = (hashid, id) => {
    return (dispatch) => {
        return fetch(`${url}/posts/${hashid}/${id}.json`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(dispatch({type: REMOVE_POST, payload: id}))
    }
}

export const fetchEditProfile = profile => {
    return () => {
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                ...profile
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(() => Cookies.set('displayName', profile.displayName, {expires: 10}))
    }
}

export const editProfileAtDB = (profile, hashid) => {
    return (dispatch) => {
        return fetch(`${url}/users/${hashid}.json`,{
            method: 'PATCH',
            body: JSON.stringify({
                displayName: profile.displayName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => dispatch(fetchEditProfile(profile)))
    }
}

export const fetchRegister = profile => {
    return (dispatch) => {
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                ...profile
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => dispatch(addRegisteredToDB(data)))
    }
}

export const addRegisteredToDB = data => {
    return (dispatch) => {
        return fetch(`${url}/users.json`, {
            method: 'POST',
            body: JSON.stringify({
                id: data.idToken,
                email: data.email,
                displayName: '',
                following: {}
            }),
            headers: {
                'Content_type': 'application/json'
            }
        }).then(() => dispatch(addHashToUser(data.idToken, data.email)))
    }
}

export const getAllPosts = (arr) => {
    return (dispatch) => {
        return fetch(`${url}/posts.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    const keys = Object.keys(data)
                        .filter(key => arr[0].find(item => item === key))
                    const multiArr = keys.map(key => {
                        const keys2 = Object.keys(data[key])
                        return keys2.map(key2 => {
                            return {
                                ...data[key][key2].post,
                                hid: key2,
                                userName: arr[1][key],
                                userid: key,
                                feed: true
                            }
                        })
                    })
                    return multiArr.flat(Infinity)
                } else {
                    return []
                }
            })
            .then(arr => {
                dispatch({type: FETCH_ALLPOSTS, payload: arr.sort((a, b) => b.id - a.id)})
            })
            .then(() => dispatch({type: HIDE_LOADER}))
    }
}

export const getFollowingPosts = hashid => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER})
        return fetch(`${url}/users/${hashid}.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.following){
                    return Object.keys(data.following).map(key => data.following[key])
                } else return []
            })
            .then(arr => dispatch(getUsersForPosts(arr)))
            .then(fullArr => dispatch(getAllPosts(fullArr)))
    }
}

export const getUsersForPosts = (arr) => {
    return(dispatch) => {
        return fetch(`${url}/users.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                const obj = {}
                arr.forEach(item => obj[item] = data[item].displayName)
                return obj
            })
            .then(obj => {
                return [arr, obj]
            })
    }
}

export const getAnotherProfile = userId => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER})
        return fetch(`${url}/users/${userId}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => dispatch({type: ANOTHER_PROFILE, payload: data}))
            .then(() => dispatch({type: HIDE_LOADER}))
    }
}

export const getAllUsers = hashid => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER})
        return fetch(`${url}/users.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                const following = data[hashid].following || {}
                return Object.keys(data).map(key => {
                    return {
                        name: data[key].displayName,
                        email: data[key].email,
                        following: data[key].following,
                        id: key,
                        isFollowing: Object.keys(following)
                            .find(item => (following[item] === key))
                    }
                })
            })
            .then(arr =>  dispatch({type: ADD_USERS_TO_STATE, payload: arr}))
    }
}

export const followUser = (id, fid) => {
    return (dispatch) => {
        return fetch(`${url}/users/${id}/following.json`, {
            method: 'POST',
            body: JSON.stringify(
                fid
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(() => dispatch({type: TOGGLE_USER, id, fid}))
    }
}

export const unfollowUser = (id, fid) => {
    return (dispatch) => {
        return fetch (`${url}/users/${id}/following.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => Object.keys(data).find(item => data[item] === fid))
            .then(founded => fetch(`${url}/users/${id}/following/${founded}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })).then(response => response.json())
            .then(() => dispatch({type: TOGGLE_USER, id, fid}))
    }
}

export const getFollowing = hashid => {
    return (dispatch) => {
        dispatch({type: SHOW_LOADER})
        return fetch(`${url}/users/${hashid}.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if(data.following){
                    return Object.keys(data.following).map(key => data.following[key])
                } else return []
            })
            .then(arr => {
                if(arr.length){
                    return dispatch(getFollowingArr(arr))
                } else {
                    return dispatch({type: GET_FOLLOWING, payload: []})
                }
            })
    }
}

export const getFollowingArr = arr => {
    return(dispatch) => {
        return fetch (`${url}/users.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {

                return Object.keys(data).filter(key => arr.find(item => item === key))
                    .map(key => {return {...data[key], hashid: key}})
            })
            .then(arr => {
                return dispatch({type: GET_FOLLOWING, payload: arr})
            })
        }
}

export const getFollowers = hashid => {
    return (dispatch) => {
        return fetch(`${url}/users.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                return Object.keys(data)
                    .filter(item => item !== hashid)
                    .filter(key => {
                            if (data[key].following){
                                const following = Object.keys(data[key].following)
                                return following.map(value => data[key].following[value])
                                    .find(val => val === hashid)

                            } else return false
                    }).map(key => {return {...data[key], hashid: key}})
            })
            .then(arr => {
                dispatch({type: GET_FOLLOWERS, payload: arr})
            })
    }
}

export const isLikePost = (hid, hashid, userid, feed) => {
    return (dispatch) => {
        return fetch(`${url}/posts/${userid}/${hid}/post.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                if (data.likes) {
                    const found = Object.keys(data.likes)
                        .find(item => data.likes[item] === hashid)
                    if (found) {

                        return dispatch(unlikePost(hid, found, hashid, userid, feed))
                    } else {
                        return dispatch(likePost(hid, hashid, userid, feed))
                    }
                } else {
                    return dispatch(likePost(hid, hashid, userid, feed))
                }
            })
    }
}

export const likePost = (hid, hashid, userid, feed) => {
    return (dispatch) => {
        return fetch(`${url}/posts/${userid}/${hid}/post/likes.json`,{
            method: 'POST',
            body: JSON.stringify(
                hashid
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(() => {
                return dispatch({type: TOGGLE_LIKE, hid, hashid, feed})
            })
    }
}

export const unlikePost = (hid, found, hashid, userid, feed) => {
    return (dispatch) => {
        return fetch(`${url}/posts/${userid}/${hid}/post/likes/${found}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(() => dispatch({type: TOGGLE_LIKE, hid, hashid, feed}))
    }
}