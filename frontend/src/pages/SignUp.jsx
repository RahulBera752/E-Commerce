import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SummaryApi } from "../common";
import signinGif from "../assets/signin.gif";
import logo from "../assets/MyWebLogo.png";

function SignUp() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Handle Input Change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle Upload Photo
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mern_product");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djwh0zpgl/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploaded = await res.json();
      console.log("Cloudinary response:", uploaded);

      setData((prev) => ({
        ...prev,
        profilePic: uploaded.secure_url || uploaded.url,
      }));

      toast.success("Photo uploaded successfully!");
    } catch (error) {
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (responseData.success) {
        toast.success("Signup successful! Redirecting to login...");

        // ✅ Redirect to login
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Signup failed!");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex w-[900px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Blue Box */}
        <div className="w-1/2 bg-[#4a90e2] text-white p-8 flex flex-col items-center justify-start">
          <img src={logo} alt="Logo" className="h-16 mb-2" />
        <h2 className="text-3xl font-bold mb-6" style={{ color: "#DAA520" }}>Sign Up</h2>
          <h5 className="text-3xl font-bold mb-4">WelCome To GhoroaStore</h5>
          <p className="text-center text-sm">
            Create your account and start shopping with us
          </p>
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          {/* Upload Photo */}
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="profilePic" className="cursor-pointer">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center relative overflow-hidden">
                {data.profilePic ? (
                  <img
                    src={data.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={signinGif}
                    alt="Default user"
                    className="w-16 h-16 object-contain"
                  />
                )}
              </div>
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPic}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={handleOnChange}
              required
              className="border rounded-lg px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-[#e53935] text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
