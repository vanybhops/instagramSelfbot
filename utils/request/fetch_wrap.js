const fetch = require("node-fetch")
class request {
  constructor() {
    this.headers = new Headers();
    this.cookies = "";
    this.initialized = false;
    this.csrf_token = null;
    this.device_id = null;
    this.app_id = null;
  }
  async send(url, options) {
    for (var key of Object.keys(options?.headers || {})) {
      this.headers.set(key, options.headers[key]);
    }
    if (this.initialized) {
      this.headers.set(
        "user-agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
      );
      this.headers.set("x-csrftoken", this.csrf_token);
      this.headers.set("cookie", this.cookies);
      this.headers.set("x-ig-app-id", this.app_id);
      this.headers.set("x-requested-with", "XMLHttpRequest");
      this.headers.set("X-Web-Device-Id", this.device_id);
    }
    options = {
      ...options,
      headers: this.headers,
    };
    let response = await fetch(url, options);
    if (response.headers.raw()['set-cookie']) {
    for (const cookie_array of response.headers.raw()['set-cookie']) {
      let cookie = cookie_array.split(" ")[0];

      if (this.cookies.includes(cookie.split("=")[0])) continue;

      this.cookies += cookie;
    }
  }
    for (
      let hmac = response.headers.get("x-ig-set-www-claim");
      hmac !== null;
      hmac = null
    )
      this.headers.set("x-ig-www-claim", hmac);
    return await response.text();
  }
}

module.exports = new request();
