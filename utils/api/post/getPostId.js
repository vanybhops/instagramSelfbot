const { request } = require("../../request");
const fs = require("fs");
/**
 * Description - Gets specified post id. ( sec-fetch-site is important )
 * @param {string} link
 * @returns {boolean}
 */
function getPostId(link) {
  const postIdRegex = /(?<=instagram:\/\/media\?id=)[0-9]+/gm;
  return request
    .send(link, {
      headers: {
        "sec-fetch-site": "none",
      },
      method: "GET",
    })
    .then((resp) => {
      const postId = String(resp.match(postIdRegex));
      return String(postId);
    });
}
module.exports = getPostId;
