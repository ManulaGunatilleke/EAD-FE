import { useState, useEffect } from "react";
import axios from "axios";

export const useTrackOrderById = (orderId) => {
  const [loading, setLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/track/${orderId}`);
        setTrackingInfo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchTracking();
    }
  }, [orderId]);

  return { loading, error, trackingInfo };
};
