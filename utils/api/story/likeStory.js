const { request } = require("../../request");

/**
 * Description - Unikes specified post.
 * @param {string} link
 * @returns {boolean}
 */

async function likeStory(link) {
  let reelId = link.split("/")
  reelId = reelId.filter(String).at(-1)
  return request
    .send(`https://www.instagram.com/api/v1/story_interactions/send_story_like`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      "body": `media_id=${reelId}`,
    })
    .then((resp) => {
      let data = JSON.parse(resp);
      return data.status == "ok";
    });
}
module.exports = likeStory;
