const request = require("./fetch_wrap")
module.exports = async ()=>{
  await request.send("https://www.instagram.com/", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-GB,en;q=0.9",
      "cache-control": "max-age=0",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    },
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(resp=>{
    request.csrf_token = String(resp.match(/(?<={\\"csrf_token\\":\\")[0-9a-zA-Z]*/gm));
    request.device_id = String(resp.match(/(?<="device_id":")[0-9a-zA-Z-]{10,}/gm));
    request.app_id    = String(resp.match(/(?<="X-IG-App-ID":")[0-9]*/gm));
    request.cookies += `csrftoken=${request.csrf_token}; `;
    request.cookies += `ig_did=${request.device_id}; `;

    request.initialized = true;
  });
  await request.send("https://www.instagram.com/api/v1/public/landing_info/", {
    "referrer": "https://www.instagram.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  })
}
