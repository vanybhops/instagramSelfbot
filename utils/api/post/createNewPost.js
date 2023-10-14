const { request } = require("../../request");
const sizeOf = require("image-size");
const fs = require("fs");
/**
 * Description - Creates new post with specifie image and caption.
 * @param {string} imagePath
 * @param {string} caption
 * @returns { Array }
 */
function createNewPost(imagePath, caption) {
  let uploadId = Date.now();
  let image = fs.readFileSync(imagePath);
  const { height, width } = sizeOf(image);
  return request
    .send(`https://i.instagram.com/rupload_igphoto/fb_uploader_${uploadId}`, {
      headers: {
        "content-type": "image/jpeg",
        offset: "0",
        "x-entity-length": String(image.byteLength),
        "x-entity-name": `fb_uploader_${uploadId}`,
        "x-entity-type": "image/jpeg",
        "x-instagram-rupload-params": `{\"media_type\":1,\"upload_id\":\"${uploadId}\",\"upload_media_height\":${height},\"upload_media_width\":${width}}`,
      },
      body: image,
      method: "POST",
    })
    .then((resp) => {
      let data = JSON.parse(resp);
      return request
        .send("https://www.instagram.com/api/v1/media/configure/", {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body: `source_type=library&caption=${caption}&upload_id=${data.upload_id}&disable_comments=0&like_and_view_counts_disabled=0&igtv_share_preview_to_feed=1&is_unified_video=1&video_subtitles_enabled=0&clips_share_preview_to_feed=1&disable_oa_reuse=false`,
          method: "POST",
        })
        .then((data) => JSON.parse(data).status == "ok");
    });
}
module.exports = createNewPost;
