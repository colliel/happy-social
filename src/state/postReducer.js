import {
    ADD_POST_TO_STATE,
    CLEAR_POSTS, FETCH_ALLPOSTS,
    FETCH_POSTS,
    REMOVE_POST, TOGGLE_LIKE
} from "./types";


const initialState = {
    posts: [],
    allPosts: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_TO_STATE:
            return state = {...state,
                posts: [...state.posts, action.payload].sort((a, b) => b.id - a.id)
            }
        case FETCH_POSTS:
            return state = {...state,
                posts: action.payload.sort((a, b) => b.id - a.id)
            }
        case REMOVE_POST:
            return state = {...state,
                posts: state.posts.filter(post => post.hid !== action.payload)
            }
        case FETCH_ALLPOSTS:
            return state = {...state,
                allPosts: action.payload.sort((a, b) => b.id - a.id)
            }
        case CLEAR_POSTS:
            return state = {...state,
                posts: [], allPosts: []
            }
        case TOGGLE_LIKE:
            const arr = action.feed ? 'allPosts' : 'posts'
            const post = JSON.parse(JSON.stringify(state[arr].find(item => item.hid === action.hid)))
            if(post.likes){
                const found = Object.keys(post.likes).find(item => post.likes[item] === action.hashid)
                if(found){
                    delete post.likes[found]
                } else {
                    post.likes[action.hashid] = action.hashid
                }
            } else {
                post.likes = {[action.hashid]: action.hashid}
            }
            const filteredPosts = state[arr].filter(item => item.hid !== post.hid)
            return state = {...state, [arr]: [...filteredPosts, post].sort((a, b) => b.id - a.id)}
        default:
            return state
    }
}