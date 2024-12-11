import React from "react";

interface ModalDeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
}

const ModalDeleteProduct: React.FC<ModalDeleteProductProps> = ({
  isOpen,
  onClose,
  onDelete,
  product,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg md:w-1/3 p-6">
        <h2 className="text-lg font-semibold mb-4">Delete Product id-{product.id}</h2>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete the product <b>{product.name}</b>?
        </p>
        <span className="text-sm text-gray-500">Rp. {product.price}</span>
        <p>{product.description}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProduct;
