import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SummaryApi } from '../common';
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from '../components/UploadProduct';


const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.all_products.url, {
        method: SummaryApi.all_products.method,
        credentials: 'include',
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        toast.error(dataResponse.message || "Failed to load products");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching products.");
      console.error("Fetch product error:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* All product list */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={product._id || index}
              fetchdata={fetchAllProduct}
            />
          ))
        }
      </div>

      {/* Upload product component */}
      {
        openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProduct}
          />
        )
      }
    </div>
  );
};

export default AllProducts;