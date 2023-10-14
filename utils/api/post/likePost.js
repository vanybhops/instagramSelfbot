const { request } = require("../../request")
const getPostId = require("./getPostId")

/**
 * Description - Likes specified post.
 * @param {string} link
 * @returns {boolean}
 */

async function likePost(link){
    let postId = await getPostId(link)
    return request.send(
        `https://www.instagram.com/api/v1/web/likes/${postId}/like/`,
        {
            method:"POST",
            headers:{
                "content-type": "application/x-www-form-urlencoded",
            }
        }
        ).then(resp=> {
            let data = JSON.parse(resp)
            return data.status == "ok"
        })
}
module.exports = likePost