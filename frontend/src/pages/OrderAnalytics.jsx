// src/pages/OrderAnalytics.jsx
import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const OrderAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
      console.error("Fetch Orders Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Totals
  const activeOrders = orders.filter((order) => order.status !== "CANCELLED");
  const totalProductsSold = activeOrders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );
  const totalSalesAmount = activeOrders.reduce(
    (sum, order) => sum + (order.finalAmount || 0),
    0
  );

  // ✅ Weekly Sales (last 7 days)
  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  const weeklyData = last7Days.map((date) => {
    const dayOrders = orders.filter(
      (order) => order.createdAt.split("T")[0] === date
    );
    const daySales = dayOrders.reduce(
      (sum, order) => sum + (order.finalAmount || 0),
      0
    );
    return {
      date: new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      sales: daySales,
    };
  });

  // ✅ Order Status Distribution
  const statusCounts = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"].map(
    (status) => ({
      status,
      count: orders.filter((order) => order.status === status).length,
    })
  );

  return (
    <div className="p-4 bg-gray-50 min-h-[calc(100vh-120px)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 Order Analytics</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading analytics...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <>
          {/* ✅ Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition text-center">
              <h3 className="text-lg font-bold text-gray-700">
                Total Products Sold
              </h3>
              <p className="text-3xl font-extrabold text-blue-600 mt-2">
                {totalProductsSold}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition text-center">
              <h3 className="text-lg font-bold text-gray-700">
                Total Sales Amount
              </h3>
              <p className="text-3xl font-extrabold text-green-600 mt-2">
                ₹{totalSalesAmount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* 📈 Weekly Sales Graph */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Weekly Sales (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Order Status Distribution */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusCounts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="status" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count">
                  {statusCounts.map((entry, index) => {
                    let color = "#3b82f6"; // default = blue (PLACED)
                    if (entry.status === "DELIVERED") color = "#22c55e"; // green
                    if (entry.status === "SHIPPED") color = "#facc15"; // yellow
                    if (entry.status === "CANCELLED") color = "#ef4444"; // red

                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={color}
                        radius={[8, 8, 0, 0]}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderAnalytics;
