// const products = [
//   { id: 1, name: "product-1" },
//   { id: 2, name: "product-2" },
//   { id: 3, name: "product-3" },
// ];

import Product from "../models/products";
import Category from "../models/categories";

export const listProduct = async (req, res) => {
  // res.json(products);
  try {
    let products;

    if (req.query._expand) {
      products = await Product.find()
        .populate("category")
        .sort({ createdAt: -1 })
        .exec();
    } else if (req.query.search) {
      console.log(req.query.search);
      const valueSearch = req.query.search;
      products = await Product.find({
        name: { $regex: valueSearch, $options: "i" },
      }).exec();
    } else if (req.query.sort == "name" && req.query.order == "asc") {
      products = await Product.find().sort({ name: -1 }).exec();
    } else if (req.query.sort == "name" && req.query.order == "desc") {
      products = await Product.find().sort({ name: 1 }).exec();
    } else if (req.query.sort == "price" && req.query.order == "asc") {
      products = await Product.find().sort({ price: 1 }).exec();
    } else if (req.query.sort == "price" && req.query.order == "desc") {
      products = await Product.find().sort({ price: -1 }).exec();
    } else {
      products = await Product.find().sort({ createdAt: -1 }).exec();
    }
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
    console.log(error);
  }
};

export const productDetail = async (req, res) => {
  try {
    let product;

    if (req.query._expand) {
      product = await Product.findOne({ _id: req.params.id })
        .populate("category")
        .exec();
    } else {
      product = await Product.findOne({ _id: req.params.id }).exec();
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product(req.body).save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const productRemove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const productUpdate = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};
