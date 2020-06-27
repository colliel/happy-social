inputData: {
    email,
    password
}
loggedUser: email

users: {
        1: {
            id,
            name,
            password,
            email,
            about,
            status,
            following: {
                userid1,
                userid2
            }
        }
},
posts: {
        1: {
            id,
            userid,
            text,
            likes: {
                userid1,
                userid2
            }
        }
},
comments: {
        1: {
            id,
            postid,
            text,
            likes: {
                userid1,
                userid2
            }
        }
}
