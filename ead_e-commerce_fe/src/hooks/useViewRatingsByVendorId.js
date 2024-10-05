import { useState, useEffect } from "react";
import axios from 'axios'

const useViewRatingByVendorId = (vendorId) => {
    const [ratingData, setRatingData] = useState(null);

    useEffect(() => {
        const viewRatingById = async () => {
            try {
                const response = await axios.get(`https://localhost:44366/api/Rating/GetRatingsByVendorId/${vendorId}`);
                if (response.status === 200) {
                    setRatingData(response.data);
                }
            } catch (error) {
                console.error("Error fetching rating details:", error);
            }
        };
        viewRatingById();
    }, [vendorId]);

    return { ratingData };

};

export default useViewRatingByVendorId;