import mongoose, { Schema } from "mongoose";
import { createHmac } from "crypto";
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
});

userSchema.methods = {
  authenPassword(password) {
    return this.password == this.encryptedPassword(password);
  },
  encryptedPassword(password) {
    if (!password) {
      return;
    }
    return createHmac("sha256", "123456").update(password).digest("hex");
  },
};

userSchema.pre("save", function (next) {
  console.log(this.password);
  this.password = this.encryptedPassword(this.password);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.password) {
    return;
  }
  const hashed = await createHmac("sha256", "123456")
    .update(this._update.password)
    .digest("hex");

  this._update.password = hashed;
});

export default mongoose.model("User", userSchema);
