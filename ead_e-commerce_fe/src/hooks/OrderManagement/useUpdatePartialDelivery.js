import { useState } from "react";
import axios from "axios";

export const useUpdatePartialDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updatePartialDelivery = async (orderId, vendorId) => {
    setLoading(true);
    setError(null); // Reset error before a new request
    setSuccess(false); // Reset success before a new request
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/order/partialDelivery/${orderId}/${vendorId}`);
      setSuccess(true);
      // Optionally use response data if needed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updatePartialDelivery };
};
