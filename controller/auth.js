import User from "../models/user";
import jwt from "jsonwebtoken";
import Bill from "../models/bill";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email }).exec();
    if (existUser) {
      return res.status(400).json({ message: "Email da ton tai" });
    }
    const user = await User({ name, email, password }).save();

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "Khong ton tai!" });
    }
    if (!user.authenPassword(password)) {
      return res.status(400).json({ message: "Mat khau khong dung!" });
    }

    const token = jwt.sign({ _id: user._id }, "123456", { expiresIn: 36000 });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const removeUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const getUserDetails = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).exec();
  const bills = await Bill.find({ user: user._id }).populate("user").exec();
  res.json({ user, bills });
};

export const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).exec();
  res.json(user);
};
