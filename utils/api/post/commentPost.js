const { request } = require("../../request")
const getPostId = require("./getPostId")

/**
 * Description - Comments specified post.
 * @param {string} link
 * @param {string} comment
 * @returns {boolean}
 */

async function likePost(link, comment){
    let postId = await getPostId(link)
    return request.send(
        `https://www.instagram.com/api/v1/web/comments/${postId}/add/`,
        {
            method:"POST",
            headers:{
                "content-type": "application/x-www-form-urlencoded",
            },
            body: "comment_text=" + comment
        }
        ).then(resp=> {
            let data = JSON.parse(resp)
            return data.status == "ok"
        })
}
module.exports = likePost