import React from "react";
import './indexPage.css';
import { Link } from "react-router-dom"; 
import bgVideo from '../../assets/mp4/bg.mp4';

export default function Index() {
    return (
        <div className="page-container">
            {/* Background Video */}
            <video className="bg-video" playsInline autoPlay muted loop>
                <source src={bgVideo} type="video/mp4" />
            </video>
    
            {/* Masthead */}
            <div className="masthead indexFont">
                <div className="masthead-content text-white">
                    <div class="container-fluid px-4 px-lg-0">
                        <h1 className="fst-italic lh-1 mb-4">Welcome to cart.io :)</h1>
                        <p className="mb-5"><strong>cart.io</strong> is a fully functional e-commerce platform where you can reach potential customers with ease. <br/><br/> Sign to your account and work together..!</p>
            
                        {/* Contact Form */}
                        <form id="contactForm">
                            <div className="input-group-newsletter">
                                <Link to="/login">
                                    <button className="btn btn-primary text-black fs-4" id="submitButton" type="submit">Login ➡️</button>               
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
            {/* Social Icons */}
            <div className="social-icons">
            <a className="btn btn-dark m-3" href="#!"><i className="fab fa-twitter"></i></a>
            <a className="btn btn-dark m-3" href="#!"><i class="fa-brands fa-youtube"></i></a>
            <a className="btn btn-dark m-3" href="#!"><i className="fab fa-instagram"></i></a>
            </div>
      </div>
    );
}
