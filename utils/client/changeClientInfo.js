const { request } = require("../request/index");
const getClientInfo = require("./getClientInfo");
/**
 * Description - Changes client info.
 * @param { string } username
 * @param { string } 
 * @param { string } 
 * @param { string } 
 * @param { string } 
 * @param { string } 
 * @returns { boolean }
 */
async function changeClientInfo({
  username = undefined,
  biography = undefined,
  nickname = undefined,
  email = undefined,
  url = undefined,
  phoneNumber = undefined,
}) {
  let currentSettings = JSON.parse(await getClientInfo());
  let wantedSettings =
    `biography=${
      biography || currentSettings?.form_data?.biography
    }&chaining_enabled=on&` +
    `email=${email || currentSettings?.form_data.email}&` +
    `external_url=${url || currentSettings?.form_data.external_url}&` +
    `first_name=${nickname || currentSettings?.form_data.first_name}&` +
    `phone_number=${phoneNumber || currentSettings?.form_data.phone_number}&` +
    `username=${username || currentSettings?.form_data.trusted_username}&`;
  request
    .send("https://www.instagram.com/api/v1/web/accounts/edit/", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: wantedSettings,
      method: "POST",
    })
    .then((resp) => {
      let data = JSON.parse(resp);
      return data.status == "ok";
    });
}
module.exports = changeClientInfo;
