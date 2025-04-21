"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
    faTwitter,
    faInstagram,
    faFacebook,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "../app/global.css";

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className="container">
                <div className="hero-content animate__animated animate__fadeInLeft">
                    <h1>
                        Schedule Smarter, <span className="gradient-text">Not Harder</span>
                    </h1>
                    <p>
                        Let AI generate engaging content while you focus on what matters. The
                        smartest way to manage your social media presence.
                    </p>
                    <a
                        href="/scheduler"
                        className="btn-primary animate__animated animate__pulse animate__infinite animate__slower"
                    >
                        Start Scheduling <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Users</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5M+</span>
                            <span className="stat-label">Posts Created</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image animate__animated animate__fadeInRight">
                    <div className="floating-element">
                        <img
                            src="/mockup.png"
                            alt="Social Media Scheduling Illustration"
                        />
                    </div>
                    <div className="floating-icons">
                        <div className="floating-icon" style={{ "--delay": "0s" }}>
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <div className="floating-icon" style={{ "--delay": "1s" }}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                        <div className="floating-icon" style={{ "--delay": "2s" }}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </div>
                        <div className="floating-icon" style={{ "--delay": "3s" }}>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
