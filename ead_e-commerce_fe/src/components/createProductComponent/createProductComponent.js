import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../createProductComponent/createProductComponent.css";
import useCreateProduct from "../../hooks/ProductMgmt/useCreateProduct";

export default function CreateProductComponent() {
  const { createProduct } = useCreateProduct();

  const productVendor = "dbsisvbsvvvwv";
  const productAvailability = false;
  const productStatus = false;

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(
        productName,
        productCategory,
        productDescription,
        productPrice,
        productQuantity,
        productImage,
        productVendor,
        productStatus,
        productAvailability
      );

      if (createProduct) {
        window.location.href = `/viewVendorProducts`;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mt-5">
      <section className="createProductSection">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center">
                <h3 className="createProductH1">cart.io - newest product</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="courseName"
                      className="form-label createProductFormHeading"
                    >
                      Product name
                    </label>
                    <input
                      type="text"
                      name="coursename"
                      id="courseName"
                      className="form-control"
                      placeholder="Enter your product name"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="productCategory"
                      className="form-label createProductFormHeading"
                    >
                      Product Category
                    </label>
                    <select
                      name="productCategory"
                      id="productCategory"
                      className="form-control"
                      required
                      value={productCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="groceries">Groceries</option>
                      <option value="furniture">Furniture</option>
                      <option value="health-fitness">Health & Fitness</option>
                      <option value="education">Education</option>
                      <option value="technology">Technology</option>
                      <option value="lifestyle">Lifestyle</option>
                    </select>
                    {productCategory && (
                      <p>Selected category: {productCategory}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="courseDescription"
                      className="form-label createProductFormHeading"
                    >
                      Product Description
                    </label>
                    <textarea
                      name="courseDescription"
                      id="courseDescription"
                      className="form-control"
                      placeholder="Enter product description"
                      onChange={(e) => {
                        setProductDescription(e.target.value);
                      }}
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="price"
                        className="form-label createProductFormHeading"
                      >
                        Price (in $)
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        placeholder="Enter the price"
                        onChange={(e) => {
                          setProductPrice(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="quantity"
                        className="form-label createProductFormHeading"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                        placeholder="Enter the quantity"
                        onChange={(e) => {
                          setProductQuantity(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="courseImage"
                      className="form-label createProductFormHeading"
                    >
                      Product Image
                    </label>
                    <div className="input-group">
                      <label
                        className="form-control text-muted"
                        htmlFor="courseImage"
                      >
                        {productImage
                          ? `File uploaded: ${productImage.name}`
                          : " "}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        name="courseImage"
                        id="courseImage"
                        className="form-control-file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      &nbsp;&nbsp;
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            document.getElementById("courseImage").click()
                          }
                        >
                          Upload Image
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      onClick={submitProduct}
                      className="btn btn-primary w-100 createBtnProduct"
                    >
                      Create Product
                    </button>
                  </div>

                  <div className="d-flex mt-3">
                    <button
                      type="reset"
                      className="btn btn-secondary w-50 me-2"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger w-50" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/viewVendorProducts`;
                    }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
