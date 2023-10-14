const { getAccountInfo, 
        getUserInfo, 
        followUser,
        unfollowUser, 
        removeFollower, 
        likePost, 
        unlikePost, 
        commentPost,
        savePost,
        unsavePost} = require("./utils/api");
const { login } = require("./utils/login_manager");

(async()=>{

    let data = await login("vany.patky", "password")
    if (!data.authenticated) {

        console.log("wrong password or you have 2fa enabled!", data)
        return
    }
    //getAccountInfo();
    //getUserInfo("vanybhops");

    //followUser("vanybhops");
    //unfollowUser("vanybhops");
    //removeFollower("vanybhops");

    //likePost("https://www.instagram.com/p/CyZGow6tkEY5rEzuiCwNFLGRRmOwIalJxQXwik0");
    //unlikePost("https://www.instagram.com/p/CyZGow6tkEY5rEzuiCwNFLGRRmOwIalJxQXwik0");

    //commentPost("https://www.instagram.com/p/CyZGow6tkEY5rEzuiCwNFLGRRmOwIalJxQXwik0", "test comment");

    //savePost("https://www.instagram.com/p/CyZGow6tkEY5rEzuiCwNFLGRRmOwIalJxQXwik0")
    //unsavePost("https://www.instagram.com/p/CyZGow6tkEY5rEzuiCwNFLGRRmOwIalJxQXwik0")
    
})()