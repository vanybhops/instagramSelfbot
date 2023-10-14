class request{
    constructor(){
        this.headers = {} ;
        this.cookies = "";
        this.initialized = false;
        this.csrf_token = null
        this.device_id = null
        this.app_id = null
    }
    async send(url, options){
        if (this.initialized) {
            this.headers = {
                ...options?.headers,
                ...this.headers,
                "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                "x-csrftoken": this.csrf_token,
                "cookie":this.cookies,
                "x-ig-app-id": this.app_id,
                "x-requested-with": "XMLHttpRequest",
                "X-Web-Device-Id": this.device_id,
            }
            options = {
                ...options,
                "headers": this.headers
            }
        }
        let response = await fetch(url, options)
        for (const cookie_array of response.headers.getSetCookie()) {
            let cookie = cookie_array.split(" ")[0]
            if ( this.cookies.includes(cookie.split("=")[0]) )continue

            this.cookies += cookie
        }
        for(let hmac = response.headers.get('x-ig-set-www-claim'); hmac !== null; hmac = null)
            this.headers["x-ig-www-claim"] = hmac;
        return await response.text()
    }
}

module.exports = new request()