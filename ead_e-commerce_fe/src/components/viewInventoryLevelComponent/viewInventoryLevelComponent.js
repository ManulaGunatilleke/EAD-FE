import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import "../viewInventoryLevelComponent/viewInventoryLevelComponent.css";
import useAllProducts from "../../hooks/ProductMgmt/useViewAllProducts";

export default function ViewInventoryLevelComponent() {
  const { products } = useAllProducts();

  return (
    <div className="ProductTable table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead className="bg-warning text-black">
          <tr>
            <th scope="col" className="text-left text-uppercase">
              Product Name
            </th>
            <th scope="col" className="text-left text-uppercase">
              Product Category
            </th>
            <th scope="col" className="text-left text-uppercase">
              Product Quantity
            </th>
            <th scope="col" className="text-left text-uppercase">
              Product Status
            </th>
            <th scope="col" className="text-left text-uppercase">
              Product Availability
            </th>
            <th scope="col" className="text-left text-uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products
              .filter((item) => item.productStatus) // Only show active products
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td className="text-uppercase">{item.productCategory}</td>
                    <td>{item.productQuantity}</td>
                    <td
                      className="ProductStatus"
                      style={{ color: item.productStatus ? "green" : "red" }}
                    >
                      {item.productStatus ? "Active" : "Inactive"}
                    </td>
                    <td
                      className="ProductAvailability"
                      style={{
                        color: item.productQuantity > 0 ? "green" : "red",
                      }}
                    >
                      {item.productQuantity > 0 ? "Available" : "Out of Stock"}
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/viewInventoryProduct/${item.productId}`;
                        }}
                        className="btn btn-outline-primary btn-sm mr-2"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      &nbsp;&nbsp;
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/updateInventory/${item.productId}`;
                        }}
                        className="btn btn-outline-warning btn-sm mr-2"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
