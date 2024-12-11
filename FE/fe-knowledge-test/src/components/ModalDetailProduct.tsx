import React from "react";

interface ModalDetailProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    description: string;
  };
}

const ModalDetailProduct: React.FC<ModalDetailProductProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null; // Modal tidak akan dirender jika isOpen false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-5/6 md:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{product.name}</h2>
        <p className="mb-2 text-sm text-gray-700">Price: Rp. {product.price}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

export default ModalDetailProduct;
