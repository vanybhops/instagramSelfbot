
const { request } = require("../../request")
const getUserInfo  = require("../user/getUserInfo")


/**
 * Description - Removes specified user from following list.
 * @param {string} user
 * @returns {boolean}
 */

async function removeFollower(user){
    let response = await getUserInfo( user )
    return request.send(
        `https://www.instagram.com/api/v1/web/friendships/${response?.id}/remove_follower/`,
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
module.exports = removeFollower