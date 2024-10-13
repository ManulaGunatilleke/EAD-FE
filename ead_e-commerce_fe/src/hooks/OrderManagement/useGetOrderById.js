import { useState, useEffect } from "react";
import axios from "axios";

export const useGetOrderById = (orderId) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5292/api/order/get/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { loading, error, order };
};
