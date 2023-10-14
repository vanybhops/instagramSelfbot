const { request, device_info } = require("../request/index");
const { encrypt, format, info } = require("../passwordManager/index");
/**
 * Description - Authenticates a client with instagram's custom encryption and logs them in.
 * @param { string } username
 * @param { string } password
 * @returns { object }
 */

async function login(username, password) {
  await device_info();
  let { key_id, public_key, version } = await info();
  let timestamp = String(Math.floor(Date.now() / 1000));
  let pass = await encrypt(key_id, public_key, password, timestamp);
  let formated_pass = format(version, timestamp, pass, username);
  let response = await request.send(
    "https://www.instagram.com/api/v1/web/accounts/login/ajax/",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Referer:
          "https://www.instagram.com/accounts/login/?__coig_restricted=1",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: formated_pass,
      method: "POST",
    }
  );
  let json_data = JSON.parse(response);
  return {
    authenticated: json_data?.authenticated || false,
    message: json_data?.message || "",
    status: json_data.status,
  };
}

module.exports = login;
