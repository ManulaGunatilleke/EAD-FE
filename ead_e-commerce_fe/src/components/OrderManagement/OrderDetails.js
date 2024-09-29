import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Correctly define the id as a string
  const id = "66f842c6fe19739e2b0ff221";

  useEffect(() => {
    axios.get(`https://localhost:44366/api/Order/get/${id}`)
      .then(response => {
        console.log('API response:', response.data);
        setOrderDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Order Details</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Delivery Status</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Cancellation Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.orderNumber}</td>
            <td>{orderDetails.userId}</td>
            <td>{orderDetails.totalPrice}</td>
            <td>{orderDetails.deliveryStatus}</td>
            <td>{orderDetails.orderStatus}</td>
            <td>{new Date(orderDetails.orderDate).toLocaleString()}</td>
            <td>{orderDetails.isCancel ? orderDetails.cancellationNote : 'N/A'}</td>
          </tr>
        </tbody>
      </Table>

      <h2>Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Availability</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.productCategory}</td>
              <td>{product.productDescription}</td>
              <td>{product.productQuantity}</td>
              <td>{product.productVendor}</td>
              <td>{product.productStatus ? 'Active' : 'Inactive'}</td>
              <td>{product.productAvailability ? 'Available' : 'Unavailable'}</td>
              <td>{product.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderDetails;
