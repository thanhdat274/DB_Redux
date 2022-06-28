import Category from "../models/categories";
import Product from "../models/products";

export const listCategory = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const categoryDetail = async (req, res) => {
  try {
    // const category = await Category.findOne({ _id: req.params.id }).exec();

    if (req.query._embed) {
      console.log(req.query._embed);
      const category = await Category.findOne({ _id: req.params.id }).exec();
      const products = await Product.find({ category })
        .select("-category")
        .exec();
      res.json({ category, products });
    } else {
      const category = await Category.findOne({ _id: req.params.id }).exec();
      res.json(category);
    }
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const category = await Category(req.body).save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const categoryRemove = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const categoryUpdate = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};
