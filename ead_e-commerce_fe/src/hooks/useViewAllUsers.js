import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`https://localhost:44366/api/User/GetAllUsers`);
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