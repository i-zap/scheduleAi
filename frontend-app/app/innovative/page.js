import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartLine, faImage } from '@fortawesome/free-solid-svg-icons';
import '../global.css';

const InnovationSection = () => {
  return (
    <section className="posts-management">
        <div className="container">
            <div className="posts-header animate__animated animate__fadeIn">
              <h1>Explore Our <span className="gradient-text">Innovations</span></h1>
            </div>

            <div className="innovation-grid">
              <div className="innovation-card animate__animated animate__fadeInUp" style={{ '--delay': '0.1s' }}>
                <div className="innovation-icon">
                  <FontAwesomeIcon icon={faBrain} />
                </div>
                <h3>Advanced AI Content Generation</h3>
                <p>Our new AI model creates even more engaging and platform-specific content tailored to your audience.</p>
                <div className="innovation-badge">New</div>
                <a href="#" className="btn-text">Learn More <i className="fas fa-arrow-right"></i></a>
              </div>

              <div className="innovation-card animate__animated animate__fadeInUp" style={{ '--delay': '0.2s' }}>
                <div className="innovation-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h3>Enhanced Analytics</h3>
                <p>Get deeper insights into your post performance with our new analytics dashboard.</p>
                <div className="innovation-badge">Beta</div>
                <a href="#" className="btn-text">Learn More <i className="fas fa-arrow-right"></i></a>
              </div>

              <div className="innovation-card animate__animated animate__fadeInUp" style={{ '--delay': '0.3s' }}>
                <div className="innovation-icon">
                  <FontAwesomeIcon icon={faImage} />
                </div>
                <h3>AI Image Generation</h3>
                <p>Create custom images for your posts with our new AI image generator.</p>
                <div className="innovation-badge">Coming Soon</div>
                <a href="#" className="btn-text">Join Waitlist <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
        </div>
    </section>
  );
};

export default InnovationSection;
