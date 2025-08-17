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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(SummaryApi.updateOrderStatus(orderId).url, {
        method: SummaryApi.updateOrderStatus(orderId).method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order status updated");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      toast.error("Failed to update status");
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
        orders.map((order, idx) => (
          <div key={idx} className="border mb-6 p-4 rounded-md shadow-sm">
            <p><b>User:</b> {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p>
              <b>Status:</b>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="ml-2 border p-1 rounded"
              >
                <option value="PLACED">PLACED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </p>
            <p><b>Items:</b></p>
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
                    <span className="font-medium">{item.productId?.productName || "Unknown"}</span>
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    <span className="text-sm text-gray-600">
                      Price: ₹{item.productId?.sellingPrice?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AllOrders;
