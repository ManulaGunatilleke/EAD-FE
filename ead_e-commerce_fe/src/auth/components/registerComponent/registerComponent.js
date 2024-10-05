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
                <img className='registerImage' src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp" alt="Registration" />
            </div>
            <div className="form-section registerform">
                <h2 className='registerheader'>Create Vendor and Customer Support Account Here</h2>
                <form onSubmit={handleUserRegister}>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="name">Name</label>
                        <input className='registerinput' type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="email">Email</label>
                        <input className='registerinput' type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="text">Address</label>
                        <input className='registerinput' type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="phone">Phone Number</label>
                        <input className='registerinput' type="number" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="userType">UserType</label>
                        <select className='registerinput' id="userType" name="userType" value={UserType} onChange={(e) => setUserType(e.target.value)} required>
                            <option value="" disabled>Select user Type</option>
                            <option value="Vendor">Vendor</option>
                            <option value="CSR">Customer Support</option>
                        </select>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="text">Username</label>
                        <input className='registerinput' type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="accountStatus">Account Status</label>
                        <select className='registerinput' id="accountStatus" name="accountStatus" value={AccountStatus} onChange={(e) => setAccountStatus(e.target.value)} required>
                            <option value="" disabled>Select account status</option>
                            <option value="NotActivate">NotActivate</option>
                            <option value="Activate">Activate</option>
                        </select>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="password">Password</label>
                        <input className='registerinput' type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-group registergroup">
                        <label className='registerlabel' htmlFor="avgRating">Average Ratings</label>
                        <input className='registerinput' type="number" id="avgRating" name="avgRating" onChange={(e) => setAvgRating(e.target.value)} required/>
                    </div>
                    <br/>
                    <button className='registerbutton' type="submit">Register Account</button>
                </form>
            </div>
        </div>
        </>
    );
}
