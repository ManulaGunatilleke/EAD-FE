import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import { useGetOrderById } from '../../hooks/OrderManagement/useGetOrderById'; // Your existing hook
import { useUpdateOrderById } from '../../hooks/OrderManagement/useUpdateOrderById'; // Import the update hook
import { Table, Spinner } from 'react-bootstrap'; // Import Bootstrap components for styling
import useSendEmailToCustomer from '../../hooks/OrderManagement/useSendEmailToCustomer'; // Import custom hook for sending emails

const OrderProducts = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const { loading: loadingOrder, error: orderError, order } = useGetOrderById(orderId); // Use the hook to fetch the order
  const { loading: loadingUpdate, error: updateError, success, updateOrder } = useUpdateOrderById(); // Use the update hook
  const [updatedOrder, setUpdatedOrder] = useState(null); // State to hold the order to be updated
  const { sendEmailToCustomer } = useSendEmailToCustomer(); // Get the email-sending function

  useEffect(() => {
    if (order) {
      setUpdatedOrder(order); // Initialize updatedOrder with fetched order
    }
  }, [order]);

  useEffect(() => {
    if (success) {
      alert("Order updated successfully!"); // Notify the user
    }
  }, [success]);

  // Update the order status when delivery status changes
  const handleStatusChange = async (productId, newStatus) => {
    if (updatedOrder) {
      const updatedProducts = updatedOrder.products.map((product) => {
        if (product.id.timestamp === productId) {
          return { ...product, productStatus: newStatus }; // Update the product's delivery status
        }
        return product;
      });

      const newOrder = { ...updatedOrder, products: updatedProducts };
      setUpdatedOrder(newOrder); // Optimistically update local state

      // Call updateOrder to update the order in the backend
      await updateOrder(orderId, newOrder);

      // Send email notification after updating the order
      const details = {
        subject: 'Product Delivery Status Updated',
        toEmail: 'inner.gunatilleke@gmail.com', // Assuming the order object has the customer's email
        fromName: 'Your Store Name',  // Customize this value as needed
        message: `The delivery status of your product has been updated to ${newStatus ? 'Delivered' : 'Not Delivered'}.`
      };

      try {
        await sendEmailToCustomer(details);
        console.log('Email sent successfully.');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  };

  if (loadingOrder) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (orderError) {
    return <p style={{ color: 'red' }}>{orderError}</p>;
  }

  // Check if order is null or undefined before accessing properties
  if (!updatedOrder || !updatedOrder.products) {
    return <p>No products found for this order.</p>; // Handle null updatedOrder case
  }

  return (
    <div className="container">
      <h1>Products in Order #{updatedOrder.orderNumber}</h1>
      {updatedOrder.products.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {updatedOrder.products.map((product, index) => {
              const { id, productName, productCategory, productDescription, productQuantity, productVendor, productStatus, productPrice } = product;

              return (
                <tr key={id.timestamp + index}> {/* Unique key generation */}
                  <td>{id.timestamp}</td> {/* Adjust this as needed to show a unique ID */}
                  <td>{productName}</td>
                  <td>{productCategory}</td>
                  <td>{productDescription}</td>
                  <td>{productQuantity}</td>
                  <td>{productVendor}</td>
                  <td>
                    <select
                      value={productStatus ? 'true' : 'false'}
                      onChange={(e) => handleStatusChange(id.timestamp, e.target.value === 'true')}
                    >
                      <option value="true">Delivered</option>
                      <option value="false">Not Delivered</option>
                    </select>
                  </td>
                  <td>${typeof productPrice === 'number' ? productPrice.toFixed(2) : 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No products found for this order.</p>
      )}
    </div>
  );
};

export default OrderProducts;
