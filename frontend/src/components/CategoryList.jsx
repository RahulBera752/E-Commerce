import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common/index";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(8).fill(null);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const { url, method } = SummaryApi.all_products;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        const categoryMap = new Map();

        result.data.forEach((product) => {
          const category = product.category?.toLowerCase();
          if (category && !categoryMap.has(category)) {
            categoryMap.set(category, product); // store first product of each category
          }
        });

        setCategories(Array.from(categoryMap.values()));
      } else {
        console.error("Failed to fetch categories:", result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Shop by Category</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={"loading-" + index}
                className="h-16 w-16 md:w-20 md:h-20 rounded-full bg-slate-200 animate-pulse"
              />
            ))
          : categories.map((item, index) => (
              <Link
                key={item._id || index}
                to={`/product-category/${encodeURIComponent(item.category)}`}
                className="cursor-pointer text-center min-w-fit"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden p-2 hover:scale-105 transition">
                  <img
                    src={item?.productImage?.[0] || "/no-image.jpg"}
                    alt={item.category}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-sm md:text-base capitalize mt-1">
                  {item.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
