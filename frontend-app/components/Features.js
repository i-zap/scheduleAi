"use client";

import React from 'react';
import '../app/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faCalendarCheck, faPlug, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
    return (
        <>
            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">
                        Why Choose <span className="gradient-text">SocialScheduler</span>?
                    </h2>
                    <div className="features-grid">
                        <div className="feature-card animate__animated animate__fadeInUp" style={{ '--delay': '0.1s' }}>
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faRobot} />
                            </div>
                            <h3>AI-Generated Content</h3>
                            <p>Our AI writes engaging posts tailored to your brand voice and audience preferences.</p>
                            <a href="#" className="btn-text">
                                Learn more <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                        <div className="feature-card animate__animated animate__fadeInUp" style={{ '--delay': '0.3s' }}>
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faCalendarCheck} />
                            </div>
                            <h3>Smart Scheduling</h3>
                            <p>Automatically post at optimal times when your audience is most active.</p>
                            <a href="#" className="btn-text">
                                Learn more <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                        <div className="feature-card animate__animated animate__fadeInUp" style={{ '--delay': '0.5s' }}>
                            <div className="feature-icon">
                                <FontAwesomeIcon icon={faPlug} />
                            </div>
                            <h3>Platform Integration</h3>
                            <p>Seamlessly connect with all major social media platforms in one dashboard.</p>
                            <a href="#" className="btn-text">
                                Learn more <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <div className="steps">
                        <div className="step animate__animated animate__fadeInUp" style={{ '--delay': '0.1s' }}>
                            <div className="step-number">1</div>
                            <h3>Write a Prompt</h3>
                            <p>Describe what you want to post about in simple terms.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step animate__animated animate__fadeInUp" style={{ '--delay': '0.3s' }}>
                            <div className="step-number">2</div>
                            <h3>AI Generates Content</h3>
                            <p>Our AI creates engaging posts based on your prompt.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step animate__animated animate__fadeInUp" style={{ '--delay': '0.5s' }}>
                            <div className="step-number">3</div>
                            <h3>Schedule & Publish</h3>
                            <p>Set a time or let our smart scheduler handle it.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content animate__animated animate__fadeIn">
                        <h2>Ready to revolutionize your social media strategy?</h2>
                        <p>Join thousands of content creators and businesses saving time with SocialScheduler.</p>
                        <a href="scheduler" className="btn-primary">
                            Get Started Now
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
