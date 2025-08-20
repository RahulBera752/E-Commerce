import { SummaryApi } from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  try {
    e?.stopPropagation();
    e?.preventDefault();

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to add products to cart");
      return { success: false };
    }

    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Attach JWT token
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to add to cart");
    }

    if (responseData.success) {
      toast.success(responseData.message || "Added to cart");
    } else {
      toast.error(responseData.message || "Something went wrong");
    }

    return responseData;
  } catch (error) {
    toast.error("Please log in...");
    console.error("Add to cart error:", error);
    return { success: false };
  }
};

export default addToCart;
