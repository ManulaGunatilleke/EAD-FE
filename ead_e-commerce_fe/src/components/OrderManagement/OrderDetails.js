import React, { useState } from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useSendEmailToCustomer from "../../hooks/OrderManagement/useSendEmailToCustomer";
import { useUpdateOrderById } from "../../hooks/OrderManagement/useUpdateOrderById";
import { useCancelOrderById } from "../../hooks/OrderManagement/useCancelOrderById";
import CancelPopup from "./CancelPopup";
import "./OrderDetails.css";

const OrderDetails = ({ orders }) => {
  const navigate = useNavigate();
  const { sendEmailToCustomer } = useSendEmailToCustomer();
  const { updateOrder } = useUpdateOrderById();
  const { cancelOrder } = useCancelOrderById();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus, order) => {
    // Immediately update local order status
    order.orderStatus = newStatus;
    if (newStatus === "Delivered" && order.deliveryStatus === "Not Delivered") {
      console.log("Cannot mark as Delivered if products are not delivered.");
      return;
    }

    updateOrder(orderId, { ...order, orderStatus: newStatus }).catch(() => {
      // Handle rollback in case of failure
      order.orderStatus = order.previousStatus;
    });

    const emailDetails = {
      subject: `Your order status has been updated to: ${newStatus}`,
      toEmail: order.email,
      fromName: "cart.io",
      message: `Dear customer, your order #${order.orderNumber} has been updated to '${newStatus}'.`,
    };

    sendEmailToCustomer(emailDetails).catch(() => {
      console.error("Failed to send email");
    });
  };

  const handleViewProducts = (orderId) => {
    navigate(`/viewOrder/${orderId}`);
  };

  const handleCancelOrder = (cancellationNote) => {
    if (selectedOrder) {
      cancelOrder(selectedOrder.id, cancellationNote);
      setShowCancelPopup(false);
    }
  };

  // Function to determine the status text and style
  const getStatusDisplay = (orderStatus) => {
    switch (orderStatus) {
      case "New":
      case "Pending":
      case "Shipped":
        return <span style={{ color: "#ff9b00", fontWeight: "bold" }}>Processing</span>;
      case "Delivered":
        return <span style={{ color: "green", fontWeight: "bold" }}>Complete</span>;
      case "Cancelled":
        return <span style={{ color: "red", fontWeight: "bold" }}>Cancelled</span>;
      default:
        return <span>{orderStatus}</span>;
    }
  };

  return (
    <div className="OrderDetailsTable table-responsive OrderDetailsFont">
      <table className="table table-bordered table-hover table-striped">
        <thead className="bg-warning text-black">
          <tr>
            <th>Order No.</th>
            <th>User Email</th>
            <th>Total Price</th>
            <th style={{ width: "120px" }}>Delivery Status</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber.slice(0, 8)}</td>
              <td>{order.email}</td>
              <td>${order.totalPrice}</td>
              <td style={{ width: "120px" }}>
                <DropdownButton
                  id="dropdown-basic-button"
                  className="dropdown-button-fixed-size" // Apply fixed size here
                  title={`${order.orderStatus}`}
                  onSelect={(status) =>
                    handleStatusChange(order.id, status, order)
                  }
                >
                  <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                  <Dropdown.Item eventKey="Shipped">Shipped</Dropdown.Item>
                  <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Cancelled"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowCancelPopup(true);
                    }}
                  >
                    Cancelled
                  </Dropdown.Item>
                </DropdownButton>
              </td>
              <td>{getStatusDisplay(order.orderStatus)}</td> {/* Apply status formatting */}
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => handleViewProducts(order.id)}
                >
                  View Order
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCancelPopup && selectedOrder && (
        <CancelPopup
          onCancel={() => setShowCancelPopup(false)}
          onSubmit={handleCancelOrder}
        />
      )}
    </div>
  );
};

export default OrderDetails;
