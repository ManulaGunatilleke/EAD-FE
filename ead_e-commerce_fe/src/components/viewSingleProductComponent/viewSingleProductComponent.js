import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UseViewProductById from "../../hooks/ProductMgmt/useViewProductById";

export default function ViewSingleProductComponent() {
  const { id } = useParams();
  const { product, error, viewOneProductById } = UseViewProductById();

  useEffect(() => {
    if (id) {
      viewOneProductById(id);
    }
  }, [id, viewOneProductById]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        {product ? product.productName : "View Product"}
      </h1>
      <div className="card mb-4 shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            {product && (
              <img
                src={product.productImage}
                alt={product.productName}
                className="img-fluid h-100 w-100 object-cover"
              />
            )}
          </div>
          <div className="col-md-6">
            <div className="card-body">
              {error && <p className="text-danger">Error: {error}</p>}
              {product && (
                <div className="text-start">
                  <h5 className="card-title"></h5>
                  <p className="card-text">
                    <strong>Product Category:</strong> {product.productCategory.toUpperCase()}
                  </p><br/>
                  <p className="card-text">
                    <strong>Description:</strong> {product.productDescription}
                  </p><br/>
                  <p className="card-text">
                    <strong>Available Quantity:</strong>{" "}
                    {product.productQuantity}
                  </p><br/>
                  <p className="card-text">
                    <strong>Product Status:</strong>{" "}
                    <span
                      className={
                        product.productStatus ? "text-success" : "text-danger"
                      }
                    ><strong>
                      {product.productStatus ? "Active" : "Inactive"}
                      </strong></span>
                  </p><br/>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.productPrice}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-warning me-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/viewVendorProducts`;
          }}
        >
          Back to all Products
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/updateProduct/${id}`;
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
