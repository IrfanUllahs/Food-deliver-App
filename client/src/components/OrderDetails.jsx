import React from "react";

const OrderDetails = ({ order }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Geting Prepared";
      case 2:
        return "Delivering";
      default:
        return "Delivered";
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-200 shadow-md rounded-lg border-2 border-red-600">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-6">
        <p className="text-gray-600">Status: {getStatusText(order?.status)}</p>
        <p className="text-gray-600">
          Total Price: ${order?.totalPrice?.toFixed(2)}
        </p>
        <p className="text-gray-600">
          Order? Date: {new Date(order?.createdAt).toLocaleString()}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Products</h3>
        {order?.products?.map((product) => (
          <div
            key={product.productId}
            className="flex items-center mb-4 p-2 border rounded-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-gray-600">
                Price: ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
