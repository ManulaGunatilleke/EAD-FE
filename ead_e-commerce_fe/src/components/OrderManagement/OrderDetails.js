import React from 'react';
import { Table } from 'react-bootstrap';
import useViewOrder from '../../hooks/OrderManagement/useViewOrder'; // Adjust the path if necessary

const OrderDetails = () => {
  const { orders, loading, error } = useViewOrder();

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
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderNumber}</td>
              <td>{order.userId}</td>
              <td>{order.totalPrice}</td>
              <td>{order.deliveryStatus}</td>
              <td>{order.orderStatus}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.isCancel ? order.cancellationNote : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Products</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h4>Order #{order.orderNumber} Products</h4>
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
              {order.products.map((product, idx) => (
                <tr key={idx}>
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
      ))}
    </div>
  );
};

export default OrderDetails;
