// src/pages/AllOrders.jsx
import React, { useEffect, useState } from 'react';
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      toast.error('Error fetching orders');
      console.error('Fetch Orders Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async (orderId, updatedFields) => {
    try {
      if (updatedFields.probableDeliveryDate) {
        updatedFields.probableDeliveryDate = new Date(updatedFields.probableDeliveryDate);
      }

      const res = await fetch(SummaryApi.updateOrderStatus(orderId).url, {
        method: SummaryApi.updateOrderStatus(orderId).method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order updated");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, ...updatedFields }
              : order
          )
        );
      } else {
        toast.error(data.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Update Order Error:", error);
      toast.error("Error updating order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-white min-h-[calc(100vh-120px)]">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        [...orders].reverse().map((order, idx) => {
          return (
            <div
              key={idx}
              className={`mb-6 p-4 rounded-lg shadow-lg transition-all duration-300
                ${
                  order.status === "CANCELLED"
                    ? "border-2 border-red-600 bg-[#FFF5F5] shadow-red-400/60 hover:shadow-red-500/80"
                    : order.status === "DELIVERED"
                    ? "border-2 border-green-600 bg-[#F6FFF6] shadow-green-400/60 hover:shadow-green-500/80"
                    : "border-2 border-yellow-600 bg-[#FFFDF6] shadow-yellow-400/60 hover:shadow-yellow-500/80"
                } hover:scale-[1.01]`}
            >
              {/* User */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium">
                  <b>User:</b> {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})
                </p>
              </div>

              {/* Phone */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium">
                  <b>Phone:</b> {order.phone}
                </p>
              </div>

              {/* Address */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium">
                  <b>Address:</b> {order.address}
                </p>
              </div>

              {/* Total + Coupon + Final Amount */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium">
                  <b>Total:</b>{" "}
                  <span className={order.discount > 0 ? "line-through text-gray-500" : ""}>
                    ₹{order.grossTotal}
                  </span>
                </p>
              </div>

              {order.discount > 0 && (
                <div className="relative mb-3">
                  <span
                    className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                      order.status === "CANCELLED"
                        ? "bg-red-600"
                        : order.status === "DELIVERED"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  ></span>
                  <p className="pl-4 font-medium text-green-700">
                    <b>Discount:</b> -₹{order.discount}{" "}
                    {order.coupon?.code && (
                      <span className="text-sm text-gray-600">
                        (Coupon: {order.coupon.code})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* ✅ Final Amount */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium text-lg text-black">
                  <b>Final Amount:</b> ₹{order.finalAmount}
                </p>
              </div>

              {/* Order Date */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium">
                  <b>Order Date:</b> {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Status */}
              <div className="relative mb-3">
                <span
                  className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                    order.status === "CANCELLED"
                      ? "bg-red-600"
                      : order.status === "DELIVERED"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                ></span>
                <p className="pl-4 font-medium flex items-center gap-2">
                  <b>Status:</b>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateOrder(order._id, {
                        status: e.target.value,
                        probableDeliveryDate: order.probableDeliveryDate || null,
                      })
                    }
                    className="ml-2 border p-1 rounded"
                    disabled={
                      order.status === "CANCELLED" || order.status === "DELIVERED"
                    }
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </p>
              </div>

              {/* Probable Delivery Date */}
              {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                <div className="relative mb-3">
                  <span
                    className={`absolute left-0 top-0 h-full w-2 rounded-l ${
                      order.status === "CANCELLED"
                        ? "bg-red-600"
                        : order.status === "DELIVERED"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                  }`}
                  ></span>
                  <p className="pl-4 font-medium flex items-center gap-2">
                    <b>Probable Delivery Date:</b>
                    {order.probableDeliveryDate ? (
                      <span>{new Date(order.probableDeliveryDate).toLocaleDateString()}</span>
                    ) : (
                      <input
                        type="date"
                        value=""
                        onChange={(e) =>
                          handleUpdateOrder(order._id, {
                            status: order.status,
                            probableDeliveryDate: new Date(e.target.value),
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="ml-2 border p-1 rounded"
                      />
                    )}
                  </p>
                </div>
              )}

              {/* Items */}
              <p className="mt-4 font-semibold">Items:</p>
              <ul className="ml-4 mt-2">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 py-2 border-b last:border-b-0"
                  >
                    <img
                      src={item.productId?.productImage?.[0] || ""}
                      alt={item.productId?.productName || "Product"}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {item.productId?.productName || "Unknown"}
                      </span>
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm text-gray-600">
                        Price: ₹
                        {item.productId?.sellingPrice?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllOrders;
