const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  images: {
    type: Array,
    default: []
  },
  category: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  material: {
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
  },
  isSale: {
    type: Number,
    default: false
  },
  assortment: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("product", ProductSchema);
