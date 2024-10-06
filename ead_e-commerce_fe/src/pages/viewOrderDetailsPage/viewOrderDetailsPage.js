// pages/OrderDetails.js
import React, { useEffect, useState } from 'react';
import useViewOrder from '../../hooks/OrderManagement/useViewOrder';
import OrderDetails from '../../components/OrderManagement/OrderDetails';
import './OrderDetailsPage.css'; // Import custom CSS for grid layout

const OrderDetailsPage = () => {
  const { orders: initialOrders, loading, error } = useViewOrder();
  const [orders, setOrders] = useState(initialOrders || []);

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Order Details</h1>
      <div className="order-grid"> {/* Grid layout for cards */}
        {orders.map((order) => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
