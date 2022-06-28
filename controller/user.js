import User from "../models/user";

export const checkUser = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ message: "Khong ton tai user" });
    }

    req.profile = user;
    req.profile.password = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
};
