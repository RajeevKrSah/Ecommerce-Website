import { Cart } from "../models/cart.model.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middlewares/verifyToken.js";
import { Router } from "express";

const router = Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, products } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products,
      });
    } else {
      products.forEach((product) => {
        const { productId, size, color, quantity } = product;

        const existingProductIndex = cart.products.findIndex(
          (item) =>
            item.productId.toString() === productId &&
            item.size === size &&
            item.color === color
        );

        if (existingProductIndex >= 0) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push(product);
        }
      });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found", items: [] });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch cart", error: err.message });
  }
});

// DELETE
router.delete(
  "/:userId/product/:_id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { userId, _id } = req.params;

    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: userId, isActive: true },
        { $pull: { products: { _id: _id } } },
        { new: true }
      );

      if (!updatedCart) {
        return res
          .status(404)
          .json({ message: "Cart or product not found", success: false });
      }

      res.status(200).json({
        message: "Product has been removed from the cart",
        success: true,
        cart: updatedCart,
      });
    } catch (err) {
      console.error("Error removing product from cart:", err);
      res.status(500).json({
        message: "Failed to remove product from the cart",
        success: false,
        error: err.message,
      });
    }
  }
);

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();

    if (!carts.length) {
      return res.status(404).json({ message: "No carts found" });
    }

    res.status(200).json(carts);
  } catch (err) {
    console.error("Error fetching all carts:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch carts", error: err.message });
  }
});

export default router;
