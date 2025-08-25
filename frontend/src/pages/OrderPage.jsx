import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buyNow = location.state?.buyNow || null; // { productId, quantity }
  const user = useSelector((state) => state?.user?.user);

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // ✅ Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const tokenHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔎 If landed from "Buy", load only that product; else load entire cart
  useEffect(() => {
    const load = async () => {
      if (buyNow?.productId) {
        try {
          const { url, method } = SummaryApi.productDetails(buyNow.productId);
          const res = await fetch(url, { method, headers: { "Content-Type": "application/json" } });
          const data = await res.json();
          if (!data.success) throw new Error(data.message || "Failed to load product");
          setCartItems([{ productId: data.data, quantity: buyNow.quantity || 1 }]);
        } catch (err) {
          toast.error(err.message || "Failed to load product");
        }
      } else {
        fetchCartItems();
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyNow]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method,
        credentials: "include",
        headers: tokenHeader,
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch cart");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load cart items");
    }
  };

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (item?.productId?.sellingPrice || 0) * (item?.quantity || 0),
      0
    );
    setTotal(parseFloat(totalPrice.toFixed(2)));
  }, [cartItems]);

  const validateInputs = () => {
    const errors = {};
    let isValid = true;

    if (!address.trim()) {
      errors.address = "Delivery address is required";
      isValid = false;
    } else if (address.length < 10) {
      errors.address = "Address too short (min 10 characters)";
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[\d+]{10,15}$/.test(phone)) {
      errors.phone = "Invalid phone (10-15 digits required)";
      isValid = false;
    }

    if (!pinCode.trim()) {
      errors.pinCode = "Pin code is required";
      isValid = false;
    }

    if (cartItems.length === 0) {
      errors.cart = "Your cart is empty";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // ✅ Apply Coupon
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "RAHUL18") {
      setDiscount(100);
      toast.success("Coupon applied! ₹100 off");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setValidationErrors({});

    try {
      if (!validateInputs()) throw new Error("Please fill the details properly");
      if (!user?._id) throw new Error("User authentication failed");

      const orderItems = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      // ✅ Corrected payload (backend expects this)
      const payload = {
        name: user.name,
        phone: phone.trim(),
        address: `${address.trim()}, Landmark: ${landmark.trim()}, PIN: ${pinCode.trim()}`,
        items: orderItems,
        paymentMethod,
        total: total - discount,   // ✅ backend checks this against finalAmount
        couponCode: discount > 0 ? couponCode.toUpperCase() : null,
        discountType: discount > 0 ? "FLAT" : null,
        discountValue: discount > 0 ? discount : 0,
      };

      if (paymentMethod === "COD") {
        await placeFinalOrder(payload);
      } else {
        await handleOnlinePayment(payload);
      }
    } catch (error) {
      toast.error(error.message || "Order failed");
    } finally {
      setIsLoading(false);
    }
  };

  const placeFinalOrder = async (orderPayload) => {
    const response = await fetch(SummaryApi.order.url, {
      method: SummaryApi.order.method,
      headers: tokenHeader,
      credentials: "include",
      body: JSON.stringify(orderPayload),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || `Order failed (${response.status})`);
    }

    toast.success(`Order #${result.orderId} placed successfully!`);
    navigate("/order-success", { state: { orderId: result.orderId } });
  };

  const handleOnlinePayment = async (orderPayload) => {
    const loadRazorpayScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Failed to load Razorpay SDK");

    // ✅ use total - discount (finalAmount)
    const orderRes = await fetch("http://localhost:8080/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: orderPayload.total, currency: "INR" }),
    });

    const data = await orderRes.json();
    if (!data.success) throw new Error("Failed to create Razorpay order");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "RB Store",
      description: "Order Payment",
      order_id: data.order.id,
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:8080/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          await placeFinalOrder({ ...orderPayload, paymentMethod: "ONLINE" });
        } else {
          throw new Error("Payment verification failed");
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: phone,
      },
      theme: { color: "#0d6efd" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name *</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number *</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${validationErrors.phone ? "border-red-500" : ""}`}
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Delivery Address *</label>
            <textarea
              placeholder="Flat, Street, Building..."
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${validationErrors.address ? "border-red-500" : ""}`}
            />
            {validationErrors.address && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Pin Code *</label>
            <input
              type="text"
              placeholder="6-digit PIN"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${validationErrors.pinCode ? "border-red-500" : ""}`}
            />
            {validationErrors.pinCode && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.pinCode}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Landmark</label>
            <input
              type="text"
              placeholder="Optional (near park, temple...)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y border rounded mb-4">
            {cartItems.map((item) => (
              <li key={item.productId?._id} className="p-3 flex justify-between">
                <span>
                  {item.productId?.productName} x {item.quantity}
                </span>
                <span>₹{(item.productId?.sellingPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          {/* ✅ Coupon Input */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full border rounded-l px-3 py-2"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-green-600 text-white px-4 rounded-r hover:bg-green-700 transition"
            >
              Apply
            </button>
          </div>

          {discount > 0 && (
            <div className="text-green-600 font-medium mb-2">Discount Applied: -₹{discount}</div>
          )}

          <div className="text-right font-semibold text-lg mb-4">
            Total: ₹{(total - discount).toFixed(2)}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="ONLINE">Online Payment</option>
            </select>
          </div>

          {validationErrors.cart && (
            <p className="text-red-500 text-sm mb-4">{validationErrors.cart}</p>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={isLoading || cartItems.length === 0}
            className={`w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition ${
              isLoading || cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
