import { useState } from "react";
import axios from "axios";

export const useUpdateOrderById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateOrder = async (orderId, order) => {
    setLoading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/${orderId}`, order);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updateOrder };
};
