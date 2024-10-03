import { useState, useEffect } from "react";
import axios from 'axios'

const useViewUserById = (userId) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const viewSingleUser = async () => {
            try {
                const response = await axios.get(`https://localhost:44366/api/User/getSingleUser/${userId}`);
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        viewSingleUser();
    }, [userId]);

    return { userData };

};

export default useViewUserById;