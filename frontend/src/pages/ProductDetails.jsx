import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SummaryApi } from "../common/index";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import { Context } from "../context";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context) || {}; // ✅ safe fallback
  const navigate = useNavigate();

  // ✅ Fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const { url, method } = SummaryApi.productDetails(params.id);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setLoading(false);

      if (!result.success) {
        console.error("Failed to fetch product:", result.message);
        toast.error("Failed to load product");
        return;
      }

      setData(result.data || {});
      setActiveImage(result.data?.productImage?.[0] || "");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching product details:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => setActiveImage(imageURL);

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  // ✅ Add to Cart with login check
  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }

    try {
      await addToCart(e, id);
      if (fetchUserAddToCart) {
        fetchUserAddToCart(); // refresh cart
      }
      //toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add product");
    }
  };

  // ✅ Buy Now with login check
  const handleBuyProduct = (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    navigate("/order", { state: { buyNow: { productId: id, quantity: 1 } } });
  };

  const productImageListLoading = new Array(4).fill(null);

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Images */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            {activeImage ? (
              <img
                src={activeImage}
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                alt={data?.productName || "product"}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

            {zoomImage && activeImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full">
            <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
              {(loading ? productImageListLoading : data?.productImage || []).map(
                (img, index) => (
                  <div
                    key={index}
                    className={`h-20 w-20 ${
                      loading ? "animate-pulse bg-slate-200" : "bg-slate-200 p-1"
                    } rounded`}
                  >
                    {!loading && img && (
                      <img
                        src={img}
                        alt={data?.productName || `thumbnail-${index}`}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(img)}
                        onClick={() => handleMouseEnterProduct(img)}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full" />
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full" />
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full" />
            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse w-full" />
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full" />
            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
            </div>
            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
              <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">{displayINRCurrency(data?.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayINRCurrency(data?.price)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
      <VerticalCardProduct category={data.category} heading={"Recommended Product"} />
    </div>
  );
};

export default ProductDetails;
