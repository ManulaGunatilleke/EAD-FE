import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderById } from "../../hooks/OrderManagement/useGetOrderById";
import { Spinner } from "react-bootstrap";
import "../OrderManagement/OrderProducts.css";

export default function OrderProducts() {
  const { orderId } = useParams();
  const { order, error, viewOrderById } = useGetOrderById();

  useEffect(() => {
    if (orderId) {
      viewOrderById(orderId);
    }
  }, [orderId, viewOrderById]);

  const currentOrder =
    Array.isArray(order) && order.length > 0 ? order[0] : null;

  // Function to determine the status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "status-new";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-other";
    }
  };

  return (
    <div className="container mt-4 orderCard">
      <h1 className="text-center mb-4 orderSingleHeading">
        {currentOrder
          ? `Order Number : ${currentOrder.orderNumber.slice(0, 8)} 🛒`
          : "View Order"}
      </h1>

      <div className="card mb-4 shadow-lg">
        <div className="card-body">
          {error && <p className="text-danger">Error: {error}</p>}
          {!currentOrder ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <div className="text-start mb-4">
                <p
                  className={`card-text OrderStatusHeading ${getStatusClass(
                    currentOrder.orderStatus
                  )}`}
                >
                  Order Status: <strong> {currentOrder.orderStatus}</strong>
                </p>
              </div>
              {currentOrder.products && currentOrder.products.length > 0 ? (
                currentOrder.products.map((product, index) => {
                  const {
                    id,
                    productName,
                    productCategory,
                    productDescription,
                    productQuantity,
                    productImage,
                    productVendor,
                    productStatus,
                    productPrice,
                  } = product;

                  return (
                    <div
                      className="row g-0 mb-3 shadow-sm p-3 product-card"
                      key={id + index}
                    >
                      {/* Display Product Image */}
                      <div
                        className="col-md-4 orderProductImage"
                        style={{ marginRight: "20px" }}
                      >
                        <img
                          src={productImage}
                          alt={productName}
                          className="img-fluid h-100 w-100 object-cover"
                        />
                      </div>

                      {/* Display Product Details */}
                      <div className="col-md-7">
                        <h5 className="card-title">
                          Product Name: {productName}
                        </h5>
                        <p className="card-text">
                          <strong>Category:</strong>{" "}
                          {productCategory.toUpperCase()}
                        </p>
                        <p className="card-text">
                          <strong>Description:</strong> {productDescription}
                        </p>
                        <p className="card-text">
                          <strong>Quantity:</strong> {productQuantity}
                        </p>
                        <p className="card-text">
                          <strong>Vendor:</strong> {productVendor}
                        </p>
                        <p className="card-text">
                          <strong>Price:</strong> $
                          {typeof productPrice === "number"
                            ? productPrice.toFixed(2)
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No products found for this order.</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-warning me-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/orderDetails`;
          }}
        >
          Back to all Orders
        </button>
      </div>
    </div>
  );
}
