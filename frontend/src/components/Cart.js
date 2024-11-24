import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
const Cart = () => {
  const { token } = useAuthStore();
  const { fetchCart, items } = useCartStore();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {items?.map((item) => (
        <div key={item.product._id} className="flex items-center border-b py-2">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover"
          />
          <div className="ml-4 flex-grow">
            <h3 className="font-bold">{item.product.name}</h3>
            <p className="text-gray-600">
              ${item.product.price} x {item.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-xl font-bold">Total: ${total}</p>
      </div>
    </div>
  );
};

export default Cart;
