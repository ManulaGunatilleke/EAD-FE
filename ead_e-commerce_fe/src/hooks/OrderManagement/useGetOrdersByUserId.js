import { useState, useEffect } from "react";
import axios from "axios";

export const useGetOrdersByUserId = (userId) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5292/api/order/getOrdersByUser/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return { loading, error, orders };
};
