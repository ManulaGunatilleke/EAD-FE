import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import UserContext from "../../ContextComponent/ContextComponent";

const useAuth = () => {
    const navigate = useNavigate();
    const { setUser, setToken, setUserId, setUserType } = useContext(UserContext);

    const userSignup = async (Name, Email, Address, Phone, UserType, IsWebUser, Username, AccountStatus, Password, AvgRating) => {
        try {
            console.log({
                Name, Email, Address, Phone, UserType, Username, AccountStatus, Password, AvgRating, IsWebUser
            });  
            const response = await axios.post('https://localhost:44366/api/User', {
                Name,
                Email,
                Address,
                Phone,
                UserType,
                IsWebUser,
                Username,
                AccountStatus,
                Password,
                AvgRating
            });
            if (response.status === 200) {
                alert("New User Account Created Successfully..!");
                navigate('/home')
            } else {
                alert("Account Created failed. Please try again."); 
            }
        } catch (error) {
            alert(error);
        }
    };

    const login = async (Email, Password) => {
        try {
            const response = await axios.post('https://localhost:44366/api/User/login', {
                Email,
                Password
            });
            if (response.status === 200) {
                const { userType } = response.data;

                // If userType is "Customer", show an alert and prevent login
                if (userType === "Customer") {
                    alert("Customers are not allowed to login.");
                    return; 
                }

                alert("Login Successfully...!");
                setUser(response.data.user);
                setToken(response.data.token);
                setUserId(response.data.userId);
                setUserType(response.data.userType);
                navigate('/home');
            } 
        } catch (error) {
            alert("Incorrect Credentials..!");
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return { userSignup, login, logout };
}

export default useAuth;