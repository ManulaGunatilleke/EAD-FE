import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useSendEmailToCustomer from '../../hooks/OrderManagement/useSendEmailToCustomer';
import { useUpdateOrderById } from '../../hooks/OrderManagement/useUpdateOrderById';
import { useCancelOrderById } from '../../hooks/OrderManagement/useCancelOrderById'; // Importing the cancel hook
import CancelPopup from './CancelPopup'; // Import the CancelPopup component
import './OrderDetails.css'; // Import the CSS file

const OrderDetails = ({ order }) => {
  const navigate = useNavigate();
  const { sendEmailToCustomer } = useSendEmailToCustomer();
  const { updateOrder, loading: updateLoading, error: updateError } = useUpdateOrderById();
  const { cancelOrder, loading: cancelLoading, error: cancelError, success: cancelSuccess } = useCancelOrderById(); // Using the cancel hook
  const [successMessages, setSuccessMessages] = useState({});
  const [emailErrors, setEmailErrors] = useState({});

  // Local state to manage order and delivery status
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus);
  const [showCancelPopup, setShowCancelPopup] = useState(false); // State to manage popup visibility

  // Function to check the product statuses and update deliveryStatus
  const updateDeliveryStatus = () => {
    const allProductsDelivered = order.products.every(product => product.productStatus);
    
    // Update delivery status if all products are delivered
    if (allProductsDelivered) {
      setDeliveryStatus('Delivered');
    } else {
      setDeliveryStatus('Not Delivered');
    }
  };

  // useEffect to monitor changes in product statuses and update delivery status accordingly
  useEffect(() => {
    updateDeliveryStatus();
  }, [order.products]); // Trigger the effect whenever products array changes

  const handleStatusChange = (orderId, newStatus) => {
    // Immediately update local state for real-time UI change (optimistic update)
    setOrderStatus(newStatus);

    const updatedOrder = {
      ...order,
      orderStatus: newStatus,
      deliveryStatus: deliveryStatus, // Sync with current delivery status
      orderDate: new Date(order.orderDate).toISOString(),
    };

    // Prevent setting to "Delivered" if all products are not delivered
    if (newStatus === 'Delivered' && deliveryStatus === 'Not Delivered') {
      console.log('Cannot mark order as delivered when not all products are delivered.');
      // Revert back to previous status in case of invalid change
      setOrderStatus(order.orderStatus);
      return;
    }

    // Call the backend API to update the order status
    updateOrder(orderId, updatedOrder)
      .then(() => {
        // Success handling
        setSuccessMessages((prevMessages) => ({
          ...prevMessages,
          [orderId]: 'Order status updated successfully!',
        }));

        // After success, update the backend state (if required)
        setTimeout(() => {
          setSuccessMessages((prevMessages) => {
            const { [orderId]: removedMessage, ...rest } = prevMessages;
            return rest;
          });
        }, 3000);
      })
      .catch((error) => {
        // Rollback the UI in case of an error
        console.error('Error updating order:', error);
        setOrderStatus(order.orderStatus); // Revert to previous state
      });

    const emailDetails = {
      subject: `Your order status has been updated to: ${newStatus}`,
      toEmail: order.userEmail,
      fromName: 'Your Shop',
      message: `Dear customer, your order #${order.orderNumber} has been updated to '${newStatus}'. Thank you for shopping with us!`,
    };

    sendEmailToCustomer(emailDetails)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setEmailErrors((prevErrors) => ({
          ...prevErrors,
          [order.id]: 'Failed to send email notification',
        }));
      });
  };

  const handleViewProducts = (orderId) => {
    navigate(`/order/products/${orderId}`);
  };

  // Function to handle cancellation and show the popup
  const handleCancelOrder = (cancellationNote) => {
    cancelOrder(order.id, cancellationNote);
    setShowCancelPopup(false); // Close the popup after submission
  };

  return (
    <Card key={order.id} className="order-card glass-effect shadow-sm">
      <Card.Body>
        <Card.Title>Order #{order.orderNumber}</Card.Title>
        <Card.Text className="order-info">User ID: <span>{order.userId}</span></Card.Text>
        <Card.Text className="order-info">User Email: <span>{order.userEmail}</span></Card.Text>
        <Card.Text className="order-info">Total Price: <span>${order.totalPrice}</span></Card.Text>
        <Card.Text className="order-info">Delivery Status: <span>{deliveryStatus}</span></Card.Text>
        <Card.Text className="order-info">Order Status: <span>{orderStatus}</span></Card.Text>
        <Card.Text className="order-info">Order Date: <span>{new Date(order.orderDate).toLocaleString()}</span></Card.Text>
        <Card.Text className="order-info">Cancellation Note: <span>{order.isCancel ? order.cancellationNote : 'N/A'}</span></Card.Text>

        <DropdownButton
          id="dropdown-basic-button"
          title={`Order Status: ${orderStatus}`}
          onSelect={(status) => handleStatusChange(order.id, status)}
        >
          <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
          <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
          <Dropdown.Item eventKey="Cancelled" onClick={() => setShowCancelPopup(true)}>Cancelled</Dropdown.Item> {/* Show popup on Cancel click */}
        </DropdownButton>

        {updateLoading && <p>Updating order status...</p>}
        {cancelLoading && <p>Cancelling order...</p>}
        {updateError && <p className="error-message">{updateError}</p>}
        {cancelError && <p className="error-message">{cancelError}</p>}
        {successMessages[order.id] && <p className="success-message">{successMessages[order.id]}</p>}
        {emailErrors[order.id] && <p className="error-message">{emailErrors[order.id]}</p>}

        <Button variant="primary" className="mt-3" onClick={() => handleViewProducts(order.id)}>
          View Products
        </Button>
      </Card.Body>

      {/* Render the CancelPopup if showCancelPopup is true */}
      {showCancelPopup && (
        <CancelPopup 
          onCancel={() => setShowCancelPopup(false)} // Close the popup
          onSubmit={handleCancelOrder} // Handle order cancellation
        />
      )}
    </Card>
  );
};

export default OrderDetails;
