import axios from "axios";

const useDeleteUser = () => {

    const onDeleteUser = async (userId) => {
        try {
            if (window.confirm("Are you sure that you want to delete this User Account..?")) {
                const response = await axios.delete(`https://localhost:44366/api/User/deleteUser/${userId}`);
                if (response.status === 200) {
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting student:", error);
        }
        return false;
    };

    return { onDeleteUser };
}

export default useDeleteUser;