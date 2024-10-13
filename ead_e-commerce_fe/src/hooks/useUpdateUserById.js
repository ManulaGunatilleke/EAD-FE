import { useState } from "react";

const useUpdateUser = () => {
    const [isUpdated, setIsUpdated] = useState(false);

    const updateUser = async (userId, formData) => {
        try {
            const response = await fetch(`http://localhost:5292/api/User/updateUser/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data) {
                setIsUpdated(true);
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return { isUpdated, updateUser };
};

export default useUpdateUser;