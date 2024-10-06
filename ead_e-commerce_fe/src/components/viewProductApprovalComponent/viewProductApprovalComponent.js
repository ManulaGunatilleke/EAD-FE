import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import "../viewInventoryLevelComponent/viewInventoryLevelComponent.css";
import useAllProducts from "../../hooks/ProductMgmt/useViewAllProducts";

export default function ViewProductApprovalComponent() {
  const { products } = useAllProducts();

  // Filter products to only show those with productStatus as false
  const inactiveProducts = products ? products.filter(item => !item.productStatus) : [];

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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {inactiveProducts.length > 0 ? (
            inactiveProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td className="text-uppercase">{item.productCategory}</td>
                  <td>{item.productQuantity}</td>
                  <td
                    className="ProductStatus"
                    style={{ color: "red" }} // Set color to red for inactive status
                  >
                    Inactive
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/viewProductApproval/${item.productId}`;
                      }}
                      className="btn btn-outline-primary btn-sm mr-2"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No inactive products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
