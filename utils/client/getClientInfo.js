const { request } = require("../request");
/**
 * Description- Retrieves information from logged in account .
 * @returns {string}
 */
function getAccountInfo() {
  return request.send(
    "https://www.instagram.com/api/v1/accounts/edit/web_form_data/"
  );
}
module.exports = getAccountInfo;
