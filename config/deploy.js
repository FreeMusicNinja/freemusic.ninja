/* jshint node: true */

module.exports = {
  production: {
    store: {
      type: "ssh",
      remoteDir: "/home/django/freemusic.ninja/dist/",
      host: "api.freemusic.ninja",
      username: "root",
      privateKeyFile: process.env.FMN_SSH_KEY_FILE,
    },
    assets: {
      type: "s3",
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: "assets.freemusic.ninja",
    }
  }
};
