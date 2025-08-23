import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SummaryApi } from "../common";
import { getUser, setUserDetails } from "../store/userSlice";
import { setCartItems, setCartCount } from "../store/cartSlice";
import logo from "../assets/MyWebLogo.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 🔑 Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Please enter both email and password");
      return;
    }

    const payload = {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };

    try {
      setLoading(true);
      const res = await fetch(SummaryApi.signin.url, {
        method: SummaryApi.signin.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        toast.success("Login Successful!");

        // ✅ Save JWT token
        localStorage.setItem("token", resData.token);

        // ✅ Save user in Redux
        dispatch(setUserDetails(resData.data));

        // ✅ Fetch user's cart
        const token = localStorage.getItem("token");
        try {
          const cartRes = await fetch(SummaryApi.viewCartProduct.url, {
            method: SummaryApi.viewCartProduct.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const cartData = await cartRes.json();
          if (cartRes.ok && cartData.success) {
            dispatch(setCartItems(cartData.data));
            dispatch(setCartCount(cartData.data.length));
          } else {
            dispatch(setCartItems([]));
            dispatch(setCartCount(0));
          }
        } catch (cartErr) {
          console.error("❌ Error fetching cart:", cartErr);
          dispatch(setCartItems([]));
          dispatch(setCartCount(0));
        }

        navigate("/");
      } else {
        toast.error(resData.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot Password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setForgotLoading(true);
      const res = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        toast.success(resData.message || "Password reset link sent to email");
        setShowForgotModal(false);
        setForgotEmail("");
      } else {
        toast.error(resData.message || "Failed to send reset link");
      }
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      toast.error("Something went wrong, please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4 pt-5">
      <div className="flex flex-col w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden min-h-[520px]">
        <div className="flex flex-1">
          {/* Left Blue Panel */}
          <div className="hidden md:flex flex-col justify-start items-center bg-[#4a90e2] text-white w-2/5 p-12">
            <img src={logo} alt="Logo" className="h-16 mb-5" />
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <p className="text-base text-gray-100 text-center leading-relaxed">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>

          {/* Right White Panel */}
          <div className="w-full md:w-3/5 p-12 flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e53935]"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e53935]"
                />
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-[#4a90e2] hover:underline mt-1"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e53935] text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-[#4a90e2] font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Forgot Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-1 bg-[#4a90e2] text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {forgotLoading ? "Sending..." : "Send Link"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
