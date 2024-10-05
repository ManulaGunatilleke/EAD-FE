import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import UserContext from '../../ContextComponent/ContextComponent';
import useAuth from '../../auth/hooks/authContext';
import './header.css'; // Import the CSS file for custom styles

export default function Header() {

    const location = useLocation();
    const { user, userId } = useContext(UserContext);
    const { logout } = useAuth();

    // Logout function
    const handleLogout = () => {
        logout();
    };

    const hideHeader = location.pathname === '/' || location.pathname === '/login';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    // Check if user is an instructor or admin
    const isAdmin = user && user.userType === "Admin";
    const isCSR = user && user.userType === "CSR";

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand fs-4 fw-bold px-4" href="/home">cart.io</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {isAdmin ? (
                    <>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link fs-5" href="/registerAccount">Create Account</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-5" href="/notActivateAccounts">Not Activate</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fs-5" href="/allUsers">All Users</a>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        {isCSR ? (
                            <>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href="#">Customer Requests</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href={`/profile/${userId}`}>My Profile</a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href="#">Products</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href={`/rating/${userId}`}>My Ratings</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href="#">My Orders</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fs-5" href={`/profile/${userId}`}>My Profile</a>
                                        </li>
                                    </ul>
                                </div>                            
                            </>
                        )}
                    </>
                )}

                <div className='px-4'>
                    <button className="btn btn-outline-danger my-2 my-sm-0 p-2" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    );
}
