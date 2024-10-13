import { useState } from "react";
import axios from "axios";

export const useMarkOrderAsDelivered = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const markAsDelivered = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5292/api/order/markAsDelivered/${orderId}`);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, markAsDelivered };
};
