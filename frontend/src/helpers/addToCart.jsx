import { SummaryApi } from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  try {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }

    return responseData;
  } catch (error) {
    toast.error("Please Log in...");
    console.error("Add to cart error:", error);
  }
};

export default addToCart;
