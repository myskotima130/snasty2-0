const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all products");
});

router.post("/", (req, res) => {
  res.send("Add new product");
});

router.put("/:id", (req, res) => {
  res.send("Update product");
});

router.delete("/:id", (req, res) => {
  res.send("Delete product");
});

module.exports = router;
