import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import productCategory from '../helpers/productCategory';
import { SummaryApi } from '../common';

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    price: 0,
    sellingPrice: 0,
    description: '',
    productImage: [],
    ...productData,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url || uploadImageCloudinary.secure_url],
      }));
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err.message || 'Image upload failed');
    }
  };

  const handleDeleteProductImage = (index) => {
    const newImages = [...data.productImage];
    newImages.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newImages,
    }));
    toast.success('Image removed successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!data.productName || !data.category || data.productImage.length === 0 || !data._id) {
      toast.error('Please fill all required fields including ID');
      setIsSubmitting(false);
      return;
    }

    try {
      const { url, method } = SummaryApi.updateProduct(data._id);

      // ✅ FIX: Attach token from localStorage/sessionStorage
      const token = localStorage.getItem("token"); 

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
        body: JSON.stringify({
          productName: data.productName,
          brandName: data.brandName,
          category: data.category,
          price: parseFloat(data.price),
          sellingPrice: parseFloat(data.sellingPrice || data.price),
          description: data.description,
          productImage: data.productImage,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Product updated successfully');
        onClose();
        fetchData?.();
      } else {
        toast.error(result.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-slate-200 bg-opacity-35 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label>Product Name:</label>
          <input name='productName' value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

          <label>Brand Name:</label>
          <input name='brandName' value={data.brandName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

          <label>Category:</label>
          <select name='category' value={data.category} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
            <option value=''>Select Category</option>
            {productCategory.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <label>Product Images:</label>
          <label htmlFor='uploadImageInput' className='cursor-pointer'>
            <div className='p-2 bg-slate-100 border rounded h-32 flex justify-center items-center'>
              <div className='text-slate-500 flex flex-col items-center'>
                <FaCloudUploadAlt className='text-4xl' />
                <p className='text-sm'>Upload Image</p>
              </div>
              <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
            </div>
          </label>

          <div className='flex gap-2 mt-2 flex-wrap'>
            {data.productImage.map((img, index) => (
              <div key={img + index} className='relative'>
                <img
                  src={img}
                  alt='product'
                  className='h-20 w-20 object-cover border rounded cursor-pointer'
                  onClick={() => {
                    setFullScreenImage(img);
                    setOpenFullScreenImage(true);
                  }}
                />
                <button
                  type='button'
                  className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1'
                  onClick={() => handleDeleteProductImage(index)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          <label>Price:</label>
          <input name='price' type='number' value={data.price} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

          <label>Selling Price:</label>
          <input name='sellingPrice' type='number' value={data.sellingPrice} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

          <label>Description:</label>
          <textarea name='description' value={data.description} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded h-28' />

          <button
            type='submit'
            disabled={isSubmitting}
            className='px-3 py-2 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400'
          >
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
      )}
    </div>
  );
};

export default AdminEditProduct;
