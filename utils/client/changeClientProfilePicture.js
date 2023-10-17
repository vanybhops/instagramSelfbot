const { readFileSync } = require("fs");
const { request } = require("../request");
const FormData = require("form-data")

/**
 * Description- Changes account profile picture.
 * @param { string } image
 * @returns { boolean }
 */
function changeClientProfilePicture(image) {
  let payload = new FormData();
  payload.append("profile_pic", readFileSync( image ), {
    "filename":"profilepic.jpg",
});
  request.headers.delete('content-type')
  return request
    .send(
      "https://www.instagram.com/api/v1/web/accounts/web_change_profile_picture/",
      {
        body: payload,
        method: "POST",
      }
    )
    .then((resp) => {
      let data = JSON.parse(resp);
      return data.status == "ok";
    });
}
module.exports = changeClientProfilePicture;
