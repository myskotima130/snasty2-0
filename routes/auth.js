const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Logged users");
});

router.post("/", (req, res) => {
  res.send("Loggin user");
});

module.exports = router;
