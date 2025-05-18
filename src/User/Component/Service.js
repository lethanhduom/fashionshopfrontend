import React from 'react';
import '../Css/Service.css';
import Footer from './Footer';
import Header from './Header';

const CustomerService = () => {
  return (
  
    <div className="fashion-service-container">
      <Header/>
      {/* Header Section */}
      <header className="service-header">
        <h1 className="brand-title">DILYS STORE CUSTOMER CARE</h1>
        <p className="brand-subtitle">Your Style, Our Priority</p>
      </header>

      {/* Service Notice */}
      <section className="service-notice">
        <h2 className="notice-title">PREMIUM CUSTOMER SERVICE</h2>
        <p className="notice-text">
          Our exclusive concierge service ensures personalized attention for all your fashion needs. 
          From styling advice to order modifications, we're dedicated to making your experience flawless.
        </p>
      </section>

      {/* Service Features */}
      <section className="service-features">
        <h2 className="features-title">OUR SERVICE COMMITMENT</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✧</div>
            <h3>Personal Stylist Access</h3>
            <p>One-on-one consultations with our fashion experts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✧</div>
            <h3>Extended Return Policy</h3>
            <p>60-day returns for all premium collection items</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✧</div>
            <h3>Alteration Services</h3>
            <p>Complimentary adjustments on selected items</p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <h2 className="contact-title">CONNECT WITH OUR STYLE TEAM</h2>
        <div className="contact-options">
          <div className="contact-option">
            <div className="contact-icon">✉</div>
            <h3>Email Assistance</h3>
            <p>style@elegance.com</p>
            <p>Response within 24 hours</p>
          </div>
          <div className="contact-option">
            <div className="contact-icon">✆</div>
            <h3>Phone Consultation</h3>
            <p>+1 (888) 555-0155</p>
            <p>Mon-Fri: 9AM-8PM EST</p>
          </div>
          <div className="contact-option">
            <div className="contact-icon">✍</div>
            <h3>Live Chat</h3>
            <p>Available on our website</p>
            <p>Instant connection with stylists</p>
          </div>
        </div>
      </section>

      {/* Special Requests */}
      <section className="special-requests">
        <h2 className="requests-title">SPECIAL REQUESTS</h2>
        <p className="requests-text">
          Our customer service team can accommodate special requests including:
        </p>
        <ul className="requests-list">
          <li>Personalized gift wrapping and messages</li>
          <li>Exclusive pre-order access to new collections</li>
          <li>Private shopping appointments</li>
          <li>Custom tailoring requests</li>
        </ul>
      </section>
      <Footer/>
    </div>
  );
};

export default CustomerService;