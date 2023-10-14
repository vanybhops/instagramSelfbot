module.exports = {
  getAccountInfo: require("../client/getClientInfo"),

  getUserInfo: require("./user/getUserInfo"),

  removeFollower: require("./followers/removeFollower"),
  unfollowUser: require("./followers/unfollowUser"),
  followUser: require("./followers/followUser"),

  getPostId: require("./post/getPostId"),
  commentPost: require("./post/commentPost"),
  getLatestPosts: require("./post/getLatestPosts"),

  savePost: require("./post/savePost"),
  unsavePost: require("./post/unsavePost"),

  likePost: require("./post/likePost"),
  unlikePost: require("./post/unlikePost"),

  createNewPost: require("./post/createNewPost"),

  likeStory: require("./story/likeStory"),
  unlikeStory: require("./story/unlikeStory"), 
};
