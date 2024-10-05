import axios from 'axios';

const useAccountActivate = () => {

    const activateAccount = async (userId) => {
        try {
            const response = await axios.put(`https://localhost:44366/api/User/updateAccountStatus/${userId}`, "Activate", {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.status === 200) {
                return true; 
            }
        } catch (error) {
            console.error("Error activating account:", error);
        } 
        return false; 
    }
    
    return { activateAccount };
}

export default useAccountActivate;
