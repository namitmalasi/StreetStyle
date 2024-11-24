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
