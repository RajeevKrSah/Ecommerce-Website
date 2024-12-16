const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        size: { type: String },
        color: { type: String },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
CartSchema.index({ userId: 1 });
module.exports = mongoose.model("Cart", CartSchema);
