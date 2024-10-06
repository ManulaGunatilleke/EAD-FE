import { useState } from "react";
import axios from "axios";

export const useCancelOrderById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cancelOrder = async (orderId, cancellationNote) => {
    setLoading(true);
    setError(null); // Reset error state before making a request
    setSuccess(false); // Reset success state before making a request

    try {
      // Ensure the cancellation note is properly formatted
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/Order/cancel/${orderId}`,
        { cancellationNote }, // Correctly formatted body
        {
          headers: {
            'Content-Type': 'application/json', // Ensure content type is set
          },
        }
      );
      
      // Handle success state
      if (response.status === 200) {
        setSuccess(true);
      }

      return response.data; // Return response for further handling if needed
    } catch (err) {
      // Capture and set error message
      setError(err.response?.data?.message || err.message); // Improved error handling
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, cancelOrder };
};
