import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import addToCart from "../helpers/addToCart";
import displayINRCurrency from "../helpers/displayCurrency";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";

const VerticalCardProduct = ({
  category,
  heading,
  data: externalData,
  scrollable = false,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await fetchCategoryWiseProduct(category);
    setData(res?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (externalData) {
      setData(externalData);
      setLoading(false);
    } else if (category) {
      fetchData();
    }
  }, [category, externalData]);

  return (
    <div className="container mx-auto px-4 my-6">
      {heading && (
        <h2 className="text-2xl font-semibold py-4">
          {heading}
        </h2>
      )}

      {scrollable ? (
        // ✅ Horizontal scrollable layout
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {(loading ? loadingList : data).map((product, index) => (
              <Link
                key={product?._id || index}
                to={product?._id ? `/product/${product._id}` : "#"}
                className="min-w-[200px] bg-white rounded shadow p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="h-48 flex justify-center items-center">
                  {loading ? (
                    <div className="bg-slate-200 h-full w-full rounded animate-pulse" />
                  ) : (
                    <img
                      src={product?.productImage?.[0] || "/no-image.png"}
                      alt={product.productName}
                      className="object-contain h-full w-full hover:scale-105 transition-transform duration-200 ease-in-out mix-blend-multiply"
                    />
                  )}
                </div>

                {loading ? (
                  <>
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 rounded w-20" />
                    <div className="h-8 bg-slate-200 rounded" />
                  </>
                ) : (
                  <>
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
                    <button
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // ✅ Grid layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded shadow p-4 animate-pulse space-y-3"
                >
                  <div className="bg-slate-200 h-48 rounded" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded" />
                </div>
              ))
            : data.map((product) => (
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

                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to Cart
                  </button>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default VerticalCardProduct;
