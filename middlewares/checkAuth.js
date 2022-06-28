import expressJWT from "express-jwt";
export const requiredSignin = expressJWT({
  secret: "123456",
  algorithms: ["HS256"],
  requestProperty: "auth",
});

export const isAuth = (req, res, next) => {
  if (!(req.profile._id == req.auth._id)) {
    return res.status(400).json({ message: "Ban khong co quyen truy cap" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(400).json({ message: "Ban khong phai la admin" });
  }
  next();
};
