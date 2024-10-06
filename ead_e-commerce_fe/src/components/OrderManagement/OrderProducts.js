import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useGetOrderById } from '../../hooks/OrderManagement/useGetOrderById'; 
import { useUpdateOrderById } from '../../hooks/OrderManagement/useUpdateOrderById'; 
import { Table, Spinner } from 'react-bootstrap'; 
import useSendEmailToCustomer from '../../hooks/OrderManagement/useSendEmailToCustomer'; 

const OrderProducts = () => {
  const { orderId } = useParams(); 
  const { loading: loadingOrder, error: orderError, order } = useGetOrderById(orderId); 
  const { loading: loadingUpdate, error: updateError, success, updateOrder } = useUpdateOrderById(); 
  const [updatedOrder, setUpdatedOrder] = useState(null); 
  const { sendEmailToCustomer } = useSendEmailToCustomer(); 

  useEffect(() => {
    if (order) {
      setUpdatedOrder(order); 
    }
  }, [order]);

  useEffect(() => {
    if (success) {
      alert("Order updated successfully!"); 
    }
  }, [success]);

  // Function to check if all products are delivered
  const checkAllProductsDelivered = (products) => {
    return products.every((product) => product.productStatus === true);
  };

  // Update the order status when delivery status changes
  const handleStatusChange = async (productId, newStatus) => {
    if (updatedOrder && updatedOrder.orderStatus !== 'Canceled') { // Prevent updates if the order is canceled
      const updatedProducts = updatedOrder.products.map((product) => {
        if (product.id.timestamp === productId) {
          return { ...product, productStatus: newStatus }; 
        }
        return product;
      });

      let newOrderStatus = updatedOrder.orderStatus;

      if (checkAllProductsDelivered(updatedProducts)) {
        newOrderStatus = 'Delivered'; 
      }

      const newOrder = { ...updatedOrder, products: updatedProducts, orderStatus: newOrderStatus };
      setUpdatedOrder(newOrder); 

      await updateOrder(orderId, newOrder);

      const details = {
        subject: newOrderStatus === 'Delivered' ? 'Your Order is Delivered!' : 'Product Delivery Status Updated',
        toEmail: 'inner.gunatilleke@gmail.com', 
        fromName: 'Your Store Name',  
        message: newOrderStatus === 'Delivered'
          ? `Your entire order has been marked as delivered.`
          : `The delivery status of your product has been updated to ${newStatus ? 'Delivered' : 'Not Delivered'}.`
      };

      try {
        await sendEmailToCustomer(details);
        console.log('Email sent successfully.');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    } else {
      alert("Cannot update product status. The order is canceled."); // Notify the user
    }
  };

  useEffect(() => {
    // If the order status is 'Canceled', we can add any additional logic if needed here
    if (updatedOrder && updatedOrder.orderStatus === 'Canceled') {
      alert("This order has been canceled. You can't update its product delivery status.");
    }
  }, [updatedOrder]);

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

  if (!updatedOrder || !updatedOrder.products) {
    return <p>No products found for this order.</p>;
  }

  return (
    <div className="container">
      <h1>Products in Order #{updatedOrder.orderNumber}</h1>
      <p>Order Status: {updatedOrder.orderStatus}</p> 
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
                <tr key={id.timestamp + index}> 
                  <td>{id.timestamp}</td> 
                  <td>{productName}</td>
                  <td>{productCategory}</td>
                  <td>{productDescription}</td>
                  <td>{productQuantity}</td>
                  <td>{productVendor}</td>
                  <td>
                    <select
                      value={productStatus ? 'true' : 'false'}
                      onChange={(e) => handleStatusChange(id.timestamp, e.target.value === 'true')}
                      disabled={updatedOrder.orderStatus === 'Canceled'}  // Disable the dropdown if the order is canceled
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
