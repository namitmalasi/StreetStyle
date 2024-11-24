import React, { useState, useEffect } from "react";
import useCartStore from "../store/cartStore";
import useProductStore from "../store/productStore";
const ProductList = () => {
  const { addToCart } = useCartStore();
  const { fetchProducts } = useProductStore();

  const { products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => addToCart(product._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
