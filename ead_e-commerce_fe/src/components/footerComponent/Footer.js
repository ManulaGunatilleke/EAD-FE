import React from "react";
import { useLocation } from "react-router-dom";
import './footer.css';

export default function Footer() {

    const location = useLocation();

    const hideFooter = location.pathname === '/' || location.pathname === '/login';

    if (hideFooter) {
        return null;
    }

    return (
        <>
            <footer className="footer cartIoFooter">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Made with ❤️ by Bihesha, Manula & Teshan.</p>
                    <div className="social-links">
                        <a href="https://web.facebook.com/teshan.jayakody/" aria-label="Facebook">Facebook</a>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" aria-label="Twitter">YouTube</a>
                        <a href="https://www.linkedin.com/in/teshanjayakody/" aria-label="LinkedIn">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </>
    )
}