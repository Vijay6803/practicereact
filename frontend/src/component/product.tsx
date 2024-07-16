// Product.tsx

import React from "react";

interface ProductProps {
  name: string;
  price: number;
  quantityLeft: number;
  description: string;
  onAddToCart: () => void; // Function to handle adding the product to cart
}

const Product: React.FC<ProductProps> = ({
  name,
  price,
  quantityLeft,
  description,
  onAddToCart,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="/placeholder.jpg"
            alt="Product Image"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {name}
          </div>
          <p className="mt-2 text-gray-500">{description}</p>
          <div className="mt-2">
            <p className="text-gray-900">${price}</p>
            <p className="text-gray-500">Quantity Left: {quantityLeft}</p>
          </div>
          <div className="mt-4">
            <button
              onClick={onAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
