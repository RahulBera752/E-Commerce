import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SummaryApi } from '../common';
import DisplayImage from './DisplayImage';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // ✅ Cloudinary Upload
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ecommerce_uploads");

    const response = await fetch("https://api.cloudinary.com/v1_1/dspjqxvxl/image/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Image upload failed");
    }

    return data.secure_url;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Multiple file upload support
  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    if (!files.length) return;

    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      setData(prev => ({
        ...prev,
        productImage: [...prev.productImage, ...uploadedUrls]
      }));
    } catch (error) {
      toast.error("Some images failed to upload. Try again.");
    }
  };

  const handleDeleteProductImage = (index) => {
    const newImages = [...data.productImage];
    newImages.splice(index, 1);
    setData(prev => ({
      ...prev,
      productImage: newImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, brandName, category, productImage, price, sellingPrice, description } = data;

    if (
      !productName.trim() ||
      !brandName.trim() ||
      !category.trim() ||
      !price ||
      !sellingPrice ||
      !description.trim() ||
      productImage.length === 0
    ) {
      toast.error("All fields are required, including product image.");
      return;
    }

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(error);
    }
  };

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='productName'>Product Name :</label>
          <input
            type='text'
            id='productName'
            name='productName'
            placeholder='Enter product name'
            value={data.productName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id='brandName'
            name='brandName'
            placeholder='Enter brand name'
            value={data.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='category' className='mt-3'>Category :</label>
          <select
            name='category'
            value={data.category}
            onChange={handleOnChange}
            required
            className='p-2 bg-slate-100 border rounded'
          >
            <option value=''>Select Category</option>
            {productCategory.map((el, index) => (
              <option key={index} value={el.value}>{el.label}</option>
            ))}
          </select>

          <label htmlFor='productImage' className='mt-3'>Product Image :</label>
          <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex flex-col items-center gap-2'>
                <FaCloudUploadAlt className='text-4xl' />
                <p className='text-sm'>Upload Product Images (You can select multiple)</p>
                <input
                  type='file'
                  id='uploadImageInput'
                  multiple
                  className='hidden'
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div className='flex items-center gap-2 mt-2 flex-wrap'>
            {data.productImage.map((img, index) => (
              <div className='relative group' key={index}>
                <img
                  src={img}
                  alt={`product-${index}`}
                  width={80}
                  height={80}
                  className='bg-slate-100 border cursor-pointer'
                  onClick={() => {
                    setOpenFullScreenImage(true);
                    setFullScreenImage(img);
                  }}
                />
                <div
                  className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded-full hidden group-hover:block cursor-pointer'
                  onClick={() => handleDeleteProductImage(index)}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Enter price'
            value={data.price}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
          <input
            type='number'
            id='sellingPrice'
            name='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />

          <label htmlFor='description' className='mt-3'>Description :</label>
          <textarea
            id='description'
            name='description'
            placeholder='Enter product description'
            rows={3}
            value={data.description}
            onChange={handleOnChange}
            className='h-28 bg-slate-100 border resize-none p-2 rounded'
          />

          <button type='submit' className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
