module.exports = {
    getAccountInfo : require("./account_data/getAccountInfo"),
    
    getUserInfo : require("./user/getUserInfo"),

    removeFollower : require("./followers/removeFollower"),
    unfollowUser : require("./followers/unfollowUser"),
    followUser : require("./followers/followUser"),

    getPostId : require("./post/getPostId"),
    commentPost : require("./post/commentPost"),
    getLatestPosts : require("./post/getLatestPosts"),
    
    
    savePost : require("./post/savePost"),
    unsavePost : require("./post/unsavePost"),

    likePost : require("./post/likePost"),
    unlikePost : require("./post/unlikePost"),
}