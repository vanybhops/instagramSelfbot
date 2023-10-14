const { request } = require("../../request")
const getUserInfo  = require("../user/getUserInfo")


/**
 * Description - Follows specified user.
 * @param {string} user
 * @returns {boolean}
 */
async function followUser(user){
    let response = await getUserInfo( user )
    return request.send(
        `https://www.instagram.com/api/v1/friendships/create/${response?.id}/`,
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
module.exports = followUser