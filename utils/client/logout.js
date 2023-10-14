const { request } = require("../request/index");
/**
 * Description - Logs out the client.
 * @param { string } username
 * @param { string } password
 * @returns { object }
 */
async function logout() {
  request.send("https://www.instagram.com/api/v1/web/accounts/logout/ajax/", {
    method: "POST",
  });
}
module.exports = logout;
