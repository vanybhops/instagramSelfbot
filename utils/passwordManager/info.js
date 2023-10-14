async function info() {
  return await fetch("https://www.instagram.com/").then(async (resp) => {
    let response_text = await resp.text();
    return JSON.parse(
      response_text.match(/(?<=InstagramPasswordEncryption",\[\],)({[^}]+})/gm)
    );
  });
}
module.exports = info;
