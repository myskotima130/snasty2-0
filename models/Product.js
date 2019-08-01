const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("product", ProductSchema);
