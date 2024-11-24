import User from "../models/userModel.js";
export const createPaymentIntent = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    const amount = user.cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
