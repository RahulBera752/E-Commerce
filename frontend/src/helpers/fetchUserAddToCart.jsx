import { SummaryApi } from "../common";

const fetchUserAddToCart = async () => {
  try {
    const response = await fetch(SummaryApi.cartProduct.url, {
      method: SummaryApi.cartProduct.method,
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return { success: false };
  }
};

export default fetchUserAddToCart;
