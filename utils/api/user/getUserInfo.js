const { request } = require("../../request");
/**
 * Description - Retrieves specified user's info.
 * @param {string} user
 * @returns { object }
 */
function getUserInfo(user) {
  return request
    .send(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${user}`
    )
    .then((response) => JSON.parse(response).data.user);
}
module.exports = getUserInfo;
