import { SummaryApi } from "../common/index";

const fetchCategoryWiseProduct = async (category) => {
  try {
    if (!category) {
      console.error("Category is required but was not provided.");
      return { success: false, data: [] };
    }

    const response = await fetch(
      `${SummaryApi.categoryWiseProduct.url}?category=${encodeURIComponent(category)}`,
      {
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch products by category:", response.statusText);
      return { success: false, data: [] };
    }

    const dataResponse = await response.json();

    // ✅ Case-insensitive and trimmed category check
    const filteredData =
      dataResponse?.data?.filter(
        (item) =>
          item.category &&
          item.category.trim().toLowerCase() === category.trim().toLowerCase()
      ) || [];

    return { success: true, data: filteredData };
  } catch (error) {
    console.error("Error in fetchCategoryWiseProduct:", error);
    return { success: false, data: [] };
  }
};

export default fetchCategoryWiseProduct;
