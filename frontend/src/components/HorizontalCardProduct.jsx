import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link, useParams } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import { Context } from "../context";

const HorizontalCardProduct = ({ category: propCategory, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchUserAddToCart } = useContext(Context);
  const { category: routeCategory } = useParams();

  const category = propCategory || routeCategory;

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    if (fetchUserAddToCart) fetchUserAddToCart();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setData([]);
      setError(null);

      if (!category) {
        setError("No category found");
        setLoading(false);
        return;
      }

      const categoryProduct = await fetchCategoryWiseProduct(category);

      const uniqueData = [];
      const seen = new Set();
      categoryProduct?.data?.forEach((item) => {
        if (!seen.has(item._id)) {
          seen.add(item._id);
          uniqueData.push(item);
        }
      });

      setData(uniqueData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching category products:", err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {heading || `Category: ${category}`}
      </h2>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow p-4 animate-pulse space-y-3"
            >
              <div className="h-32 bg-slate-200" />
              <div className="h-4 bg-slate-200 w-3/4" />
              <div className="h-4 bg-slate-200 w-1/2" />
              <div className="h-8 bg-slate-200 rounded" />
            </div>
          ))
        ) : data.length === 0 ? (
          <p className="text-gray-500 text-sm italic col-span-full">
            No products found.
          </p>
        ) : (
          data.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-md shadow-md 
                         hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] 
                         transition transform hover:scale-105 
                         flex flex-col duration-200 border border-green-200"
            >
              <div className="h-48 flex items-center justify-center p-2">
                <img
                  src={product.productImage[0]}
                  alt={product.productName}
                  className="object-contain h-full hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-3">
                <h2 className="font-medium text-base line-clamp-1">
                  {product.productName}
                </h2>
                <p className="text-slate-500 text-sm capitalize">
                  Category: {product.category}
                </p>
                <div className="flex items-center gap-2 my-2">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through text-sm">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-red-600 hover:bg-red-700 
                             text-white px-3 py-1 rounded-full 
                             w-full shadow-md shadow-green-400"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
