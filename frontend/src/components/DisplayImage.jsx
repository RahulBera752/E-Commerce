import React from 'react';
import { CgClose } from 'react-icons/cg';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded max-w-5xl w-full mx-auto p-4 relative">
        <div
          className="absolute top-2 right-2 text-2xl text-gray-800 hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>

        <div className="flex justify-center items-center max-w-[80vw] max-h-[80vh] overflow-auto">
          <img
            src={imgUrl}
            alt="Product"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
