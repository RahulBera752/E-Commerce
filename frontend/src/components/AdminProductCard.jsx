import React, { useState } from 'react';
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ data, fetchData }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="border p-4 rounded shadow w-64">
      <img
        src={data.productImage?.[0]}
        alt={data.productName}
        className="h-32 object-cover w-full mb-2"
      />
      <h3 className="font-bold">{data.productName}</h3>
      <p className="text-sm text-gray-500">{data.category}</p>
      <p className="text-sm">₹{data.sellingPrice}</p>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => setOpenEdit(true)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        {/* You can add a delete button here */}
      </div>

      {/* Edit Product Modal */}
      {openEdit && (
        <AdminEditProduct
          onClose={() => setOpenEdit(false)}
          productData={data}
          fetchData={fetchData} // ✅ use consistent prop name
        />
      )}
    </div>
  );
};

export default AdminProductCard;

