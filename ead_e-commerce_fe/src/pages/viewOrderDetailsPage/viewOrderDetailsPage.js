// pages/OrderDetails.js
import React, { useEffect, useState } from 'react';
import useViewOrder from '../../hooks/OrderManagement/useViewOrder';
import OrderDetails from '../../components/OrderManagement/OrderDetails';
import './OrderDetailsPage.css'; 

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
      <h1 className='orderDetailsHeading'>Order Details</h1>
      <p className='orderDetailsPara'>View all the orders received from customers of cart.io at your own ease! 🤩</p>

      <OrderDetails orders={orders} />
    </div>
  );
};

export default OrderDetailsPage;
