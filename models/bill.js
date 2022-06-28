import mongoose, { Schema, ObjectId } from "mongoose";
const billSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Bill", billSchema);
