const {
  getAccountInfo,
  getUserInfo,
  followUser,
  unfollowUser,
  removeFollower,
  likePost,
  unlikePost,
  commentPost,
  savePost,
  unsavePost,
  createNewPost,
  likeStory,
  unlikeStory,
} = require("./utils/api");
const { login, logout, changeClientInfo } = require("./utils/client");

(async () => {
  let data = await login("vanybhops", "super secret password");
  if (!data.authenticated) {
    console.log("wrong password or you have 2fa enabled!", data);
    return;
  }
  getAccountInfo();
  getUserInfo("vanybhops");

  followUser("vanybhops");
  unfollowUser("vanybhops");
  removeFollower("vanybhops");

  likePost(
    "https://www.instagram.com/p/Cya_zGAtUbg"
  );
  unlikePost(
    "https://www.instagram.com/p/Cya_zGAtUbg"
  );

  commentPost(
    "https://www.instagram.com/p/Cya_zGAtUbg",
    "test comment"
  );

  savePost(
    "https://www.instagram.com/p/Cya_zGAtUbg"
  );
  unsavePost(
    "https://www.instagram.com/p/Cya_zGAtUbg"
  );

  createNewPost("test.jpeg", "test2");

  likeStory('https://www.instagram.com/stories/vanybhops/3213712222328329600/')
  unlikeStory('https://www.instagram.com/stories/vanybhops/3213712222328329600/')

  logout();
  changeClientInfo({
    username: "vany.patky2",
    biography: "vany",
    nickname: "vany",
    email: "vanycodes@gmail.com",
    url: "https://github.com/vanybhops",
  });
})();
