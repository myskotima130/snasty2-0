const url = require("url");

module.exports = (req, filename) =>
  url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: `/uploads/${filename}`
  });
