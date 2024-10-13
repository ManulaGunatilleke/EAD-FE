import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseViewProductById from "../../hooks/ProductMgmt/useViewProductById";
import "./productApprovalComponent.css";
import useDeleteProduct from "../../hooks/ProductMgmt/useDeleteProduct";

export default function ProductApprovalComponent() {
  const { id } = useParams();
  const { product, error, viewOneProductById } = UseViewProductById();

  const [item, setItem] = useState(null);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productStatus, setProductStatus] = useState("");

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (item) {
      setProductName(item.productName);
      setProductCategory(item.productCategory);
      setProductDescription(item.productDescription);
      setProductPrice(item.productPrice);
      setProductQuantity(item.productQuantity);
      setProductImage(item.productImage);
      setProductStatus(item.productStatus);
    }
  }, [item]);

  const getProductDetails = async () => {
    let result = await fetch(
      `http://localhost:5292/api/Product/getProductById/${id}`
    );
    result = await result.json();
    setItem(result);
  };

  const updateProductStatus = async (status) => {
    let result = await fetch(
      `http://localhost:5292/api/Product/updateProductById/${id}`,
      {
        method: "Put",
        body: JSON.stringify({
          productName,
          productCategory,
          productDescription,
          productPrice,
          productQuantity,
          productImage,
          productStatus: status,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    console.log(result);
    result = await result.json();

    if (result) {
      alert("Product Approved Successfully!");
      window.location.href = `/productApprovals`;
    }
  };

  useEffect(() => {
    if (id) {
      viewOneProductById(id);
    }
  }, [id, viewOneProductById]);

  const onDeleteProduct = useDeleteProduct();

  const handleDelete = async (id) => {
    const isDeleted = await onDeleteProduct(id);
    if (isDeleted) {
      alert("Your product has been deleted successfully!");
      window.location.href = "/productApprovals";
    } else {
      console.log(
        "Error with the product deletion, please try again later ..."
      );
    }
  };

  const handleApprove = (e) => {
    e.preventDefault();
    updateProductStatus(true); 
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        {product ? product.productName : "View Product"}
      </h1>
      <div className="card mb-4 shadow-lg">
        <div className="row g-0">
          <div className="col-md-4">
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
                    <strong>Product Category:</strong>{" "}
                    {product.productCategory.toUpperCase()}
                  </p>
                  <br />
                  <p className="card-text">
                    <strong>Description:</strong> {product.productDescription}
                  </p>
                  <br />
                  <p className="card-text">
                    <strong>Available Quantity:</strong>{" "}
                    {product.productQuantity}
                  </p>
                  <br />
                  <p className="card-text">
                    <strong>Product Status:</strong>{" "}
                    <span
                      className={
                        product.productStatus ? "text-success" : "text-danger"
                      }
                    >
                      <strong>
                        {product.productStatus ? "Active" : "Inactive"}
                      </strong>
                    </span>
                  </p>
                  <br />
                  <p className="card-text">
                    <strong>Price:</strong> ${product.productPrice}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center btnProductApproval">
        <div className="d-flex justify-content-center btnProductApproval mb-4">
          <button
            className="btn btn-success btn-long me-2"
            onClick={handleApprove}
          >
            Approve Product
          </button>

          <button
            className="btn btn-danger btn-long"
            onClick={() => handleDelete(id)}
          >
            Reject Product
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-link me-2"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/productApprovals`;
          }}
        >
          Back to Approvals
        </button>
      </div>
      <br />
    </div>
  );
}
