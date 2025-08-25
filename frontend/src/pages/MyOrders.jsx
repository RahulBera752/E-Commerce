import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import MyWebLogo from "../assets/MyWebLogo.png";

const calculateDistanceKm = (pin1, pin2) => {
  if (!pin1 || !pin2) return 0;
  return Math.abs(parseInt(pin1) - parseInt(pin2)) * 10;
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 5;

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to view orders");
      }

      const response = await fetch(
        `${SummaryApi.myOrders.url}?page=${page}&limit=${ordersPerPage}`,
        {
          method: SummaryApi.myOrders.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed with status ${response.status}`
        );
      }

      if (data.success) {
        setOrders(data.data?.orders || []);
        setTotalPages(Math.ceil((data.data?.totalCount || 0) / ordersPerPage));
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const response = await fetch(SummaryApi.cancelOrder.url, {
        method: SummaryApi.cancelOrder.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order cancelled successfully");
        fetchOrders(currentPage);
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error(error.message);
    }
  };

  const generateInvoice = (order) => {
    try {
      const grossTotal = order.items.reduce(
        (acc, item) =>
          acc +
          (item.quantity || 1) *
            (item.sellingPrice || item.productId?.sellingPrice || 0),
        0
      );
      const discount = order.discount || 0;
      const finalAmount = grossTotal - discount;

      const doc = new jsPDF();
      doc.addImage(MyWebLogo, "PNG", 10, 10, 30, 30);
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("INVOICE", 105, 20, { align: "center" });

      doc.setFontSize(18);
      doc.setFont("times", "bold");
      doc.text("GhoroaStore", 105, 30, { align: "center" });
      doc.setFontSize(10);
      doc.text("Policepara, Garia", 105, 35, { align: "center" });
      doc.text("Kolkata, West Bengal 700152", 105, 40, { align: "center" });

      doc.setFontSize(12);
      doc.text(`Invoice #: ${order._id}`, 14, 60);
      doc.text(
        `Order Date: ${moment(order.createdAt).format("MMMM D, YYYY")}`,
        14,
        70
      );

      doc.text(`Bill To: ${order.name}`, 14, 85);
      doc.text(`Phone: ${order.phone}`, 14, 95);
      doc.text(`${order.address}`, 14, 105);

      autoTable(doc, {
        startY: 120,
        head: [["Description", "Qty", "Price", "Amount"]],
        body: order.items.map((item) => [
          item.productName || item.productId?.productName || "Product",
          item.quantity || 1,
          `Rs. ${
            item.sellingPrice?.toFixed(2) ||
            item.productId?.sellingPrice?.toFixed(2) ||
            "0.00"
          }`,
          `Rs. ${(
            (item.quantity || 1) *
            (item.sellingPrice || item.productId?.sellingPrice || 0)
          ).toFixed(2)}`,
        ]),
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: 20 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
        },
        margin: { top: 120 },
      });

      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(`Subtotal: Rs. ${grossTotal.toFixed(2)}`, 150, finalY);

      if (order.coupon) {
        doc.text(
          `Coupon (${order.coupon.code}): -Rs. ${discount.toFixed(2)}`,
          150,
          finalY + 10
        );
      }

      doc.text(
        `Final Amount: Rs. ${finalAmount.toFixed(2)}`,
        150,
        finalY + (order.coupon ? 20 : 10)
      );

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Thank you For Visiting", 105, finalY + 40, { align: "center" });
      doc.text("Contact GhoroaStore: 033-98654422", 105, finalY + 45, {
        align: "center",
      });

      doc.save(`invoice_${order._id}_${moment().format("YYYYMMDD")}.pdf`);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Invoice generation error:", error);
      toast.error("Failed to generate invoice");
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm A");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      PLACED: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-purple-100 text-purple-800",
      SHIPPED: "bg-yellow-100 text-yellow-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (!localStorage.getItem("token")) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Login Required</h2>
          <p className="mb-4">Please login to view your orders</p>
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchOrders(currentPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No orders found</p>
            <a
              href="/products"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {orders.map((order) => {
                const grossTotal = order.items?.reduce(
                  (acc, item) =>
                    acc +
                    (item.quantity || 1) *
                      (item.sellingPrice || item.productId?.sellingPrice || 0),
                  0
                );
                const discount = order.discount || 0;
                const finalAmount = grossTotal - discount;

                const borderColor =
                  order.status === "CANCELLED"
                    ? "border-red-500 hover:shadow-red-500/50"
                    : "border-green-500 hover:shadow-green-500/50";

                return (
                  <div
                    key={order._id}
                    className={`border-2 ${borderColor} rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] duration-300`}
                  >
                    <div className="bg-gray-50 px-4 py-3 border-b flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Order #</p>
                        <p className="font-medium text-sm">{order._id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Order Date</p>
                        <p className="text-sm">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <div className="text-sm">
                          {order.coupon && discount > 0 ? (
                            <>
                              <p className="text-gray-600 line-through decoration-red-500 decoration-2">
                                Rs. {grossTotal.toFixed(2)}
                              </p>
                              <p className="text-green-600 text-xs">
                                -Rs. {discount.toFixed(2)}{" "}
                                {order.coupon?.code
                                  ? `(Coupon: ${order.coupon.code})`
                                  : ""}
                              </p>
                              <p className="font-bold text-black">
                                Rs. {finalAmount.toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="font-bold text-black">
                              Rs. {finalAmount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="mt-1">{getStatusBadge(order.status)}</div>
                      </div>
                    </div>

                    {/* Delivery info */}
                    {order.status !== "CANCELLED" && (
                      <>
                        {order.status === "DELIVERED" ? (
                          <div className="px-4 py-3 border-b bg-green-50">
                            <p className="text-sm text-green-700 font-medium">
                              ✅ Delivered on{" "}
                              {moment(order.deliveredAt || order.updatedAt).format(
                                "MMMM Do YYYY, h:mm A"
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="px-4 py-3 border-b bg-green-50">
                            <p className="text-sm text-green-700 font-medium">
                              📅{" "}
                              {order.probableDeliveryDate
                                ? `Expected Delivery: ${moment(
                                    order.probableDeliveryDate
                                  ).format("MMMM Do YYYY")}`
                                : "⏳ Waiting for admin to update delivery date..."}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Items */}
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Items</h3>
                      <div className="space-y-3">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={
                                  item.productImage?.[0] ||
                                  item.productId?.productImage?.[0] ||
                                  "/placeholder.png"
                                }
                                alt={
                                  item.productName ||
                                  item.productId?.productName ||
                                  "Product"
                                }
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder.png";
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {item.productName ||
                                  item.productId?.productName ||
                                  "Unknown Product"}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} × Rs.
                                {item.sellingPrice?.toFixed(2) ||
                                  item.productId?.sellingPrice?.toFixed(2) ||
                                  "0.00"}
                              </p>
                            </div>
                            <div className="text-sm font-medium">
                              Rs.
                              {(
                                (item.quantity || 1) *
                                (item.sellingPrice ||
                                  item.productId?.sellingPrice ||
                                  0)
                              ).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-50 px-4 py-3 border-t flex justify-between">
                      {order.status === "DELIVERED" && (
                        <button
                          onClick={() => generateInvoice(order)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Download Invoice
                        </button>
                      )}
                      {(order.status === "PLACED" ||
                        order.status === "PROCESSING") && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1 || loading}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      disabled={loading}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1
                          ? "bg-blue-100 border-blue-300"
                          : ""
                      } ${loading ? "opacity-50" : ""}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || loading}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

