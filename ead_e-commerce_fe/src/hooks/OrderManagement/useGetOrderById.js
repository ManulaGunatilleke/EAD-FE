import { useState, useEffect } from "react";
import axios from "axios";

export const useGetOrderById = (orderId) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const viewOrderById = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5292/api/Order/get/${orderId}`);
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    return() => {
      setOrder(null);
      setLoading(true);
      setError(null);
    }
  }, []);

  return { loading, error, order, viewOrderById };
};
