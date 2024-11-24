import User from "../models/userModel.js";
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.userId);

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCartQuantity = async () => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // Ensure quantity is a positive number
    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    // Find user and their cart
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the cart item
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // If quantity is 0, remove item from cart
    if (quantity === 0) {
      user.cart.splice(cartItemIndex, 1);
    } else {
      // Update quantity
      user.cart[cartItemIndex].quantity = quantity;
    }

    // Save the updated cart
    await user.save();

    // Calculate total items and cart value
    const cartTotal = user.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const totalItems = user.cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    return res.json({
      success: true,
      cart: user.cart,
      cartTotal,
      totalItems,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating cart",
    });
  }
};
