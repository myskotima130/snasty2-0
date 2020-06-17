const express = require("express");
const { check, validationResult } = require("express-validator");
const formatImageUrl = require("../utils/formatImageUrl");
const isAdmin = require("../middleware/isAdmin");
const Product = require("../models/Product");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    const {
      _id,
      isSale,
      assortment,
      images,
      category,
      title,
      quantity,
      description,
      material
    } = product;
    const imagesFormated = images.map(image => formatImageUrl(req, image));
    const newProduct = {
      id2: _id,
      isSale,
      assortment,
      images: imagesFormated,
      category,
      title,
      quantity,
      description,
      material
    };
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const { category, sale } = req.query;
  try {
    let products;
    if (category && category !== "Все товары") {
      products = await Product.find({ category }).sort({ date: -1 }); // the most recent
    } else if (sale) {
      products = await Product.find({ isSale: { $gt: 0 } }).sort({ date: -1 }); // the most recent
    } else {
      products = await Product.find({}).sort({ date: -1 }); // the most recent
    }

    const newProducts = products.map(
      ({ _id, isSale, assortment, images, category, title, quantity }) => ({
        id: _id,
        isSale,
        assortment,
        images: images.map(image => formatImageUrl(req, image)),
        category,
        title,
        quantity
      })
    );
    res.json(newProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    isAdmin,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("image", "image is required")
        .not()
        .isEmpty(),
      check("price", "price is required")
        .not()
        .isEmpty(),
      check("category", "category is required")
        .not()
        .isEmpty(),
      check("quantity", "quantity is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const { title, images, category, price, quantity } = req.body;

    try {
      const newProduct = new Product({
        title,
        images,
        category,
        price,
        quantity
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", isAdmin, async (req, res) => {
  const { title, images, category, price, quantity } = req.body;

  const productFields = {};

  if (title) productFields.title = title;
  if (images) productFields.images = images;
  if (category) productFields.category = category;
  if (price) productFields.price = price;
  if (quantity) productFields.quantity = quantity;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    product = await Product.findByIdandUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
