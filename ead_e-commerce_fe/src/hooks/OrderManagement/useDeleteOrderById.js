import { useState } from "react";
import axios from "axios";

export const useDeleteOrderById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/order/${orderId}`);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, deleteOrder };
};
