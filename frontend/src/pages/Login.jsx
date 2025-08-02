import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SummaryApi } from "../common";
import { getUser, setUserDetails } from "../store/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [data, setData] = useState({ email: "", password: "" });

  // ✅ Redirect if already logged in
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

    try {
      console.log("Submitting login with:", data);

      const res = await fetch(SummaryApi.signin.url, {
        method: SummaryApi.signin.method,
        credentials: "include", // If using cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      console.log("Login response:", resData);

      if (res.ok && resData.success) {
        toast.success("Login Successful!");

        // ✅ Store token for refresh logic
        localStorage.setItem("token", resData.token);

        // ✅ Update Redux state
        dispatch(setUserDetails(resData.data));
        navigate("/");
      } else {
        toast.error(resData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold">Login</h2>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-200"
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
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" className="text-red-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
