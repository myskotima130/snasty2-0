const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Вы не авторизованы" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (decoded.user.isAdmin) {
      req.user = decoded.user;
      next();
    } else {
      return res.status(401).json({ msg: "Вы не администратор" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Вы не авторизованы" });
  }
};
