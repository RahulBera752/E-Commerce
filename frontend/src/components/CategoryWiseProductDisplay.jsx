import React, { useContext } from "react";
import { Context } from "../context"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryWiseProductDisplay = ({ categoryProduct = [] }) => {
  const context = useContext(Context);
  const navigate = useNavigate();

  if (!context) {
    console.error("Context is undefined. Did you forget to wrap your app in ContextProvider?");
    return null; // Prevent crashing
  }

  const { fetchUserAddToCart } = context;

  const handleAddToCart = async (product) => {
    const response = await fetchUserAddToCart(product);
    if (response.success) {
      toast.success("Added to cart");
    } else {
      toast.error(response.message || "Error adding to cart");
    }
  };

  return (
    <div className="category-product-list grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {categoryProduct.map((item, index) => (
        <div
          key={item._id || index}
          className="border rounded p-2 shadow hover:shadow-md transition"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          <img
            src={item?.productImage}
            alt={item?.productName}
            className="w-full h-40 object-contain"
          />
          <h2 className="font-semibold text-lg">{item?.productName}</h2>
          <p className="text-sm text-gray-500">{item?.category}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-red-600 font-bold">₹{item?.price}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation
                handleAddToCart(item);
              }}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryWiseProductDisplay;
