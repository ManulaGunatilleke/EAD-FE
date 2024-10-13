import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5292/api/User/GetAllUsers`);
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    return { users };
}

export default useAllUsers;