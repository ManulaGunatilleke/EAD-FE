import React from "react";
import './indexPage.css';
import { Link } from "react-router-dom"; 
import { Container } from "react-bootstrap";

export default function Index() {
    return (
        <div className="landing-page">
            <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">

                <div className="text-container text-center">
                    <div className="company-name">
                        <div>MTB SELLERS</div>
                    </div>
                    <div className="description">
                        <p>Your one-stop shop for all mountain biking needs. ddddddsssssssssssssssssddddddd <br/>
                        dddddddddddddddddddddddjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj <br/>
                        gggggggggggggggggggggggggggggggggg</p>
                    </div>
                </div>
                
                <div className="login-button">
                    <Link to="/login">
                        <button type="button" className="btn btn-secondary large-button">Login here</button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
