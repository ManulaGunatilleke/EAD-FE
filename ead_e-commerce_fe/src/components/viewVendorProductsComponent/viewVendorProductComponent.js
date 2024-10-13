import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../../ContextComponent/ContextComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import "../viewVendorProductsComponent/viewVendorProductComponent.css";
import useDeleteProduct from "../../hooks/ProductMgmt/useDeleteProduct";

export default function ViewVendorProductComponent() {
  const { userId } = useContext(UserContext);
  const vendorId = userId;

  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:5292/api/Product/getProductsByVendor/${vendorId}`);

    if(response.status === 200) {
      setData(response.data);
    }
  }

  const onDeleteProduct = useDeleteProduct();

  const handleDelete = async (data) => {
    console.log(data);
    const isDeleted = await onDeleteProduct(data.productId);
    if (isDeleted) {
      alert("Your product has been deleted successfully!");
      window.location.href = "/viewVendorProducts";
    } else {
      console.log(
        "Error with the product deletion, please try again later ..."
      );
    }
  };

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
          {data &&
            data.map((item, index) => {
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
                  <td>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/viewProduct/${item.productId}`;
                      }}
                      className="btn btn-outline-primary btn-sm mr-2"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/updateProduct/${item.productId}`;
                      }}
                      className="btn btn-outline-warning btn-sm mr-2"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
