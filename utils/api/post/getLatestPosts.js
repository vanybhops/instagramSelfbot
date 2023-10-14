const { request } = require("../../request")
/**
 * Description - Gets latest posts of specified user.
 * @param {string} user
 * @returns { Array }
 */
async function getLatestPosts(user){
    return request.send(
        `https://www.instagram.com/api/v1/feed/user/${user}/username/?count=12`,
        {
            method:"GET",
            headers:{
                "content-type": "application/x-www-form-urlencoded",
            }
        }
        ).then(resp=> {
            let data = JSON.parse(resp)
            return data.items
        })
}
module.exports = getLatestPosts