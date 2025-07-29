import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import displayINRCurrency from "../helpers/displayCurrency";

const CategoryProduct = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [sortBy, setSortBy] = useState("highToLow");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const apiUrl = `${SummaryApi.categoryWiseProduct.url}?category=${encodeURIComponent(category)}`;
      const response = await fetch(apiUrl, {
        method: SummaryApi.categoryWiseProduct.method,
      });
      const result = await response.json();

      if (result.success) {
        const sortedData = sortProducts(result.data);
        setProducts(sortedData);
      } else {
        setProducts([]);
        toast.info(result.message || "No products found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch(SummaryApi.all_products.url);
      const result = await response.json();

      if (result.success) {
        const categories = Array.from(
          new Set(result.data.map((item) => item.category?.trim()))
        ).filter(Boolean);
        setAllCategories(categories);
      }
    } catch (err) {
      console.error("Failed to fetch all categories:", err);
    }
  };

  const sortProducts = (data) => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) =>
      sortBy === "lowToHigh"
        ? a.sellingPrice - b.sellingPrice
        : b.sellingPrice - a.sellingPrice
    );
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    setProducts((prev) => sortProducts(prev));
  }, [sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-10 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-60 bg-white rounded-lg shadow p-4 h-fit sticky top-20">
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">SORT BY</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="highToLow"
                  checked={sortBy === "highToLow"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                Price: High to Low
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  value="lowToHigh"
                  checked={sortBy === "lowToHigh"}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2"
                />
                Price: Low to High
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">CATEGORY</h3>
            <ul className="space-y-1">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/product-category/${encodeURIComponent(cat)}`}
                    className={`block capitalize ${
                      cat.toLowerCase() === category?.toLowerCase()
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Showing Products For:{" "}
            <span className="text-blue-600 capitalize">{category}</span>
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No products found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white rounded shadow p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="h-48 flex justify-center items-center">
                    <img
                      src={product?.productImage?.[0] || "/no-image.png"}
                      alt={product.productName}
                      className="object-contain h-full w-full hover:scale-105 transition-transform duration-200 ease-in-out mix-blend-multiply"
                    />
                  </div>
                  <h2 className="font-medium text-base md:text-lg text-black line-clamp-1">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-red-600 font-semibold">
                    Category: {product.category || "N/A"}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product.sellingPrice || 0)}
                    </p>
                    {product.price && (
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product.price)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryProduct;
