import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          index: true,
        },
        size: { type: String },
        color: { type: String },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
