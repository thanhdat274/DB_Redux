import mongoose, { Schema, ObjectId } from "mongoose";
const billDetailSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" },
    product: { type: ObjectId, ref: "Product" },
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    bill: { type: ObjectId, ref: "Bill" },
  },
  { timestamps: true }
);
export default mongoose.model("Billdetail", billDetailSchema);
