const Cart = require("../models/cart.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();


 //CREATE
 router.post("/", verifyToken, async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products || !Array.isArray(products)) {
    return res.status(400).json({ message: "Invalid input data.", success: false  });
  }

  const newCart = new Cart({
    userId,
    products,
  });

  try {
    const savedCart = await newCart.save();
    res.status(201).json({ message: "successfully created", success: true, data: savedCart});
  } catch (err) {
    console.error("Error creating cart:", err);
    res.status(500).json({ message: "Failed to create cart", error: err.message, success: false, error: err.message });
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Failed to update cart", success: false, error: "An unexpected error occurred."  });
  }
});


//DELETE
router.delete("/:productId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete(req.params.productId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found", success: false });
    }

    res.status(200).json({ message: "Cart has been deleted", success: true  });
  } catch (err) {
    console.error("Error deleting cart:", err);
    res.status(500).json({ message: "Failed to delete cart", success: false, error: err.message });
  }
});


//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});


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
    res.status(500).json({ message: "Failed to fetch carts", error: err.message });
  }
});


module.exports = router;

// //----------------------------------------------------------------------->>>>>>>>

// //UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const updatedCart = await Cart.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET USER CART
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const cart = await Cart.find({ userId: req.params.userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     res.status(200).json(cart);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch cart", error: err.message });
//   }
// });

// //GET ALL

// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.status(200).json(carts);
//   } catch (err) {
//     console.error("Error fetching all carts:", err);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch carts", error: err.message });
//   }
// });


