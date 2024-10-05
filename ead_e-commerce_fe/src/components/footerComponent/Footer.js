import React from "react";
import { useLocation } from "react-router-dom";
import './footer.css';

export default function Footer() {

    const location = useLocation();

    const hideFooter = location.pathname === '/' || location.pathname === '/login';

    if (hideFooter) {
        return null; // Render nothing if footer should be hidden
    }

    return (
        <>
            <br/><br/>
            <footer className="footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} MTB Sellers. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#facebook" aria-label="Facebook">Facebook</a>
                        <a href="#twitter" aria-label="Twitter">YouTube</a>
                        <a href="#linkedin" aria-label="LinkedIn">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    )
}