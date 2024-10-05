import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../updateProductComponent/updateProduct.css";

export default function UpdateInventory() {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");

  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setProductCategory(product.productCategory);
      setProductDescription(product.productDescription);
      setProductPrice(product.productPrice);
      setProductQuantity(product.productQuantity);
      setProductImage(product.productImage);
    }
  }, [product]);

  const getProductDetails = async () => {
    let result = await fetch(
      `https://localhost:44366/api/Product/getProductById/${params.id}`
    );
    result = await result.json();
    setProduct(result);
  };

  const updateProductDetails = async () => {
    let result = await fetch(
      `https://localhost:44366/api/Product/updateProductById/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({
          productName,
          productCategory,
          productDescription,
          productPrice,
          productQuantity,
          productImage,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    console.log(result);
    result = await result.json();

    if (result) {
      alert("Product Quantity Updated Successfully!");
      window.location.href = `/inventory`;
    }
  };

  const increaseQuantity = () => {
    setProductQuantity((prevQuantity) => parseInt(prevQuantity) + 1);
  };

  const decreaseQuantity = () => {
    setProductQuantity((prevQuantity) =>
      prevQuantity > 0 ? parseInt(prevQuantity) - 1 : 0
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h1 className="text-primary mb-3" style={{ fontSize: "24px" }}>
                Update Product Quantity
              </h1>
              <div className="quantity-controls mb-4">
                <button
                  className="btn btn-danger mx-2"
                  style={{ fontSize: "24px" }}
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span
                  className="quantity-display"
                  style={{ fontSize: "24px", fontWeight: "bold" }}
                >
                  {productQuantity}
                </span>
                <button
                  className="btn btn-success mx-2"
                  style={{ fontSize: "24px" }}
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary w-100 mb-2"
                onClick={updateProductDetails}
                style={{ fontSize: "20px" }}
              >
                Update Quantity
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/viewVendorProducts`;
                }}
                style={{ fontSize: "20px" }}
              >
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
