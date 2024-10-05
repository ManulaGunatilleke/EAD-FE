import { useState } from "react";
import axios from "axios";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const createOrder = async (order) => {
    setLoading(true);
    try {
      const response = await axios.post("${process.env.REACT_APP_API_URL}/order", order);
      setOrderId(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, orderId, createOrder };
};
