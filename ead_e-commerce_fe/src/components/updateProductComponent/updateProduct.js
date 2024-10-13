import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../updateProductComponent/updateProduct.css";

export default function UpdateProduct() {
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
      console.log(product);
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
      `http://localhost:5292/api/Product/getProductById/${params.id}`
    );
    result = await result.json();
    setProduct(result);
  };

  const updateProductDetails = async () => {
    let result = await fetch(
      `http://localhost:5292/api/Product/updateProductById/${params.id}`,
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
      alert("Product Updated Successfully!");
      window.location.href = `/viewProduct/${params.id}`;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="text-primary mb-3">Product:</h1>
          <img src={productImage} className="img-fluid mb-4" alt="Course" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="courseName" className="form-label">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="courseName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="courseCode" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="courseCode"
                    placeholder="Enter a valid course code"
                    value={productCategory.toUpperCase()}
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="courseDescription" className="form-label">
                    Product Description
                  </label>
                  <textarea
                    className="form-control"
                    id="courseDescription"
                    placeholder="Enter course description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">
                      Price (in $)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter the price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="duration" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter the duration"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mb-2"
                  onClick={updateProductDetails}
                >
                  Update Product
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/viewVendorProducts`;
                  }}
                >
                  Back to Products
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
