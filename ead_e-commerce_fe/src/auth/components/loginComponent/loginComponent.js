import React, { useState } from 'react';
import useAuth from '../../hooks/authContext';
import { Link } from "react-router-dom"; 
import './loginComponent.css';

export default function LoginComponent() {

    const { login } = useAuth();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(Email, Password);
        } catch (error) {
            setError('Incorrect Credentials or Not Activate Account..!')
        }
    }

    return (
        <div className="logincontainer">
            <div className="header">
                <Link to="/">
                    <h1 className="website-name">MTB SELLERS</h1>
                </Link>
            </div>
            <div className="h-100 d-flex justify-content-center align-items-center">
                <div className="card">
                    <div className="card-header">
                        <h3 className='text-center'>Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                </div>
                                <input type="email" className="form-control" placeholder="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" required/> Remember Me
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="form-group button-container">
                                <input type="submit" value="Login" className="btn login_btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
