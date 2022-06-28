import mongoose, { Schema, ObjectId } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    img: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", desc: "text" });

export default mongoose.model("Products", productSchema);
