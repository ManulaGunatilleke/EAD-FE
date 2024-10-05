import React, { useState } from 'react';
import './registerComponent.css';
import useAuth from '../../hooks/authContext';

export default function RegisterComponent() {

    const { userSignup } = useAuth();

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [UserType, setUserType] = useState("");
    const [Username, setUsername] = useState("");
    const [AccountStatus, setAccountStatus] = useState("");
    const [Password, setPassword] = useState("");
    const [AvgRating, setAvgRating] = useState("");

    const handleUserRegister = async (e) => {
        e.preventDefault();
        const avgRatingDouble = parseFloat(AvgRating); 
        await userSignup(Name, Email, Address, Phone, UserType, true, Username, AccountStatus, Password, avgRatingDouble );
    }

    return (
        <>
        <div className="registration-container">
            <div className="image-section">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp" alt="Registration" />
            </div>
            <div className="form-section">
                <h2>Create Vendor and Customer Support Account Here</h2>
                <form onSubmit={handleUserRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Address</label>
                        <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userType">UserType</label>
                        <select id="userType" name="userType" value={UserType} onChange={(e) => setUserType(e.target.value)} required>
                            <option value="" disabled>Select user Type</option>
                            <option value="Vendor">Vendor</option>
                            <option value="CSR">Customer Support</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Username</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountStatus">Account Status</label>
                        <select id="accountStatus" name="accountStatus" value={AccountStatus} onChange={(e) => setAccountStatus(e.target.value)} required>
                            <option value="" disabled>Select account status</option>
                            <option value="NotActivate">NotActivate</option>
                            <option value="Activate">Activate</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avgRating">Average Ratings</label>
                        <input type="number" id="avgRating" name="avgRating" onChange={(e) => setAvgRating(e.target.value)} required/>
                    </div>
                    <br/>
                    <button type="submit">Register Account</button>
                </form>
            </div>
        </div>
        </>
    );
}
