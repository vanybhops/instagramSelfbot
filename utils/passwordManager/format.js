function format(version, timestamp, password, username) {
  return (
    `enc_password=` +
    encodeURIComponent(
      `#PWD_INSTAGRAM_BROWSER:${version}:${timestamp}:${password}`
    ) +
    `&optIntoOneTap=false&queryParams={}&trustedDeviceRecords={}&username=${username}`
  );
}
module.exports = format;
