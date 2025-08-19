import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import displayINRCurrency from "../helpers/displayCurrency";
import { Context } from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method,
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please log in to view your cart");
        navigate("/login");
        return;
      }

      const resData = await res.json();

      if (resData.success) {
        setData(resData.data || []);
      } else {
        toast.error(resData.message || "Failed to fetch cart items");
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Something went wrong while fetching the cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantity = async (type, item) => {
    const quantity = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (quantity < 1) return;

    try {
      const res = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: item._id,
          quantity,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        fetchData();
      } else {
        toast.error(resData.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating cart");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      const resData = await res.json();
      if (resData.success) {
        fetchData();
        context.fetchUserAddToCart?.();
        toast.success("Item removed");
      } else {
        toast.error(resData.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting item");
    }
  };

  const totalQuantity = data.reduce(
    (acc, curr) => (curr.productId ? acc + curr.quantity : acc),
    0
  );

  const subtotal = data.reduce(
    (acc, curr) =>
      curr.productId ? acc + curr.quantity * curr.productId.sellingPrice : acc,
    0
  );

  const deliveryCharge = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="container mx-auto p-4 pt-8 flex flex-col lg:flex-row gap-4">
      {/* Cart Items */}
      <div className="w-full lg:w-9/12">
        {loading ? (
          <p className="text-center text-gray-600">Loading cart...</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          data.map((product, index) => {
            const prod = product?.productId;
            if (!prod) return null;

            const itemTotal = product.quantity * prod.sellingPrice;

            return (
              <div
                key={product._id || index}
                className="w-full bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4"
              >
                <div className="w-full md:w-2/12">
                  <img
                    src={prod.productImage?.[0]}
                    alt={prod.productName}
                    className="w-full h-full object-scale-down"
                  />
                </div>

                <div className="w-full md:w-10/12 flex flex-col justify-between">
                  <h2 className="font-semibold text-lg">{prod.productName}</h2>

                  <div className="text-sm text-gray-600 mt-1">
                    <span className="block">
                      MRP:{" "}
                      <span className="line-through">
                        {displayINRCurrency(prod.price || prod.sellingPrice + 100)}
                      </span>
                    </span>
                    <span className="block">
                      Selling Price: {displayINRCurrency(prod.sellingPrice)}
                    </span>
                  </div>

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantity("dec", product)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantity("inc", product)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 font-medium">
                    Subtotal:{" "}
                    <span className="text-green-600">
                      {displayINRCurrency(itemTotal)}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary */}
      <div className="w-full lg:w-3/12 bg-white p-4 rounded-lg shadow h-fit sticky top-16">
        <h2 className="text-lg font-semibold bg-red-600 text-white p-2 rounded">
          Summary
        </h2>
        <p className="mt-2">
          Quantity: <span className="font-semibold">{totalQuantity}</span>
        </p>
        <p className="mt-2">
          Subtotal:{" "}
          <span className="font-semibold">
            {displayINRCurrency(subtotal)}
          </span>
        </p>
        <p className="mt-2">
          Delivery Charges:{" "}
          <span className="font-semibold">
            {displayINRCurrency(deliveryCharge)}
          </span>
        </p>
        <p className="mt-2 border-t pt-2">
          Total Price:{" "}
          <span className="font-bold text-green-700">
            {displayINRCurrency(grandTotal)}
          </span>
        </p>

        <button
          onClick={() => navigate("/order")}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
