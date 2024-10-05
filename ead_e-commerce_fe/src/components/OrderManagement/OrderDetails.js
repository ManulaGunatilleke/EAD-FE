import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory to useNavigate
import useViewOrder from '../../hooks/OrderManagement/useViewOrder'; // Adjust path if needed
import { useUpdateOrderById } from '../../hooks/OrderManagement/useUpdateOrderById'; // Hook to update order status
import useSendEmailToCustomer from '../../hooks/OrderManagement/useSendEmailToCustomer'; // Import your custom hook for sending email

const OrderDetails = () => {
  const { orders: initialOrders, loading, error } = useViewOrder();
  const { updateOrder, loading: updateLoading, error: updateError } = useUpdateOrderById();
  const { sendEmailToCustomer } = useSendEmailToCustomer(); // Destructure the sendEmailToCustomer function
  const [orders, setOrders] = useState(initialOrders || []); // Local state for orders
  const [successMessages, setSuccessMessages] = useState({}); // Track success messages per order
  const [emailErrors, setEmailErrors] = useState({}); // Track email errors per order
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders); // Sync initial orders fetched from the API to the state
    }
  }, [initialOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    const selectedOrder = orders.find((order) => order.id === orderId);
    if (selectedOrder) {
      // Create the full updated order object
      const updatedOrder = {
        ...selectedOrder,
        orderStatus: newStatus, // Update only the status field
        orderDate: new Date(selectedOrder.orderDate).toISOString(), // Ensure correct date format
      };
      
      // Call the updateOrder function with the updated order object
      updateOrder(orderId, updatedOrder);

      // Update local state optimistically
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      );
      setOrders(updatedOrders); // Update the local state to reflect the new order status

      // Set success message for the specific order
      setSuccessMessages((prevMessages) => ({
        ...prevMessages,
        [orderId]: 'Order status updated successfully!',
      }));

      // Clear the success message after a delay (optional)
      setTimeout(() => {
        setSuccessMessages((prevMessages) => {
          const { [orderId]: removedMessage, ...rest } = prevMessages; // Remove the success message for this order
          return rest; // Return the rest of the messages
        });
      }, 3000); // Clear message after 3 seconds

      // **Send email notification**
      const emailDetails = {
        subject: `Your order status has been updated to: ${newStatus}`,
        toEmail: 'inner.gunatilleke@gmail.com',
        fromName: 'Your Shop', // Set your shop name
        message: `Dear customer, your order #${selectedOrder.orderNumber} has been updated to '${newStatus}'. Thank you for shopping with us!`
      };

      // Call the email sending function and handle errors
      sendEmailToCustomer(emailDetails)
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          // Track email sending errors in state
          setEmailErrors((prevErrors) => ({
            ...prevErrors,
            [orderId]: 'Failed to send email notification',
          }));
        });
    }
  };

  const handleViewProducts = (orderId) => {
    navigate(`/order/products/${orderId}`); // Updated to use navigate
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Order Details</h1>

      {orders.map((order) => (
        <Card key={order.id} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>Order #{order.orderNumber}</Card.Title>
            <Card.Text>User ID: {order.userId}</Card.Text>
            <Card.Text>User Email: {order.userEmail}</Card.Text> {/* Assuming you have the email */}
            <Card.Text>Total Price: ${order.totalPrice}</Card.Text>
            <Card.Text>Delivery Status: {order.deliveryStatus}</Card.Text>
            <Card.Text>Order Status: {order.orderStatus}</Card.Text>
            <Card.Text>Order Date: {new Date(order.orderDate).toLocaleString()}</Card.Text>
            <Card.Text>Cancellation Note: {order.isCancel ? order.cancellationNote : 'N/A'}</Card.Text>

            {/* Dropdown to update order status */}
            <DropdownButton
              id="dropdown-basic-button"
              title={`Order Status: ${order.orderStatus}`}
              onSelect={(status) => handleStatusChange(order.id, status)}
            >
              <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
              <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
              <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
            </DropdownButton>

            {/* Show loading, error, or success messages after updating order status */}
            {updateLoading && <p>Updating order status...</p>}
            {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
            {successMessages[order.id] && (
              <p style={{ color: 'green' }}>{successMessages[order.id]}</p>
            )}
            {emailErrors[order.id] && (
              <p style={{ color: 'red' }}>{emailErrors[order.id]}</p>
            )}

            {/* Button to view products */}
            <Button variant="primary" className="mt-3" onClick={() => handleViewProducts(order.id)}>
              View Products
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default OrderDetails;
