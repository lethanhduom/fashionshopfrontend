import React from 'react';
import "../Css/Footer.css";
import image1 from "../../Image/facebook.jpg";
import image2 from "../../Image/insta.jpg";
function Footer() {
  return (
    <footer className="footer-reset">
      <div className="footer-reset-container">
        <div className="footer-reset-links-container">
          <div className="footer-reset-links-column">
            <h3>Links</h3>
            <ul>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Support Forum</a></li>
              <li><a href="#">Free Trial</a></li>
            </ul>
          </div>
          <div className="footer-reset-links-column">
            <h3>Links</h3>
            <ul>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Our Blog</a></li>
              <li><a href="#">Affiliates</a></li>
            </ul>
          </div>
          <div className="footer-reset-links-column">
            <h3>Links</h3>
            <ul>
              <li><a href="#">EULA</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
       
      
      </div>
      <div className="footer-reset-bottom">
        <div className="bottom-left">
          <span>DilysShop</span>
          <span className="separator">|</span>
          <a href="#">End User License Agreement</a>
          <span className="separator">|</span>
          <a href="#">Privacy Policy</a>
          <span className="separator">|</span>
       
        </div>
        <div className="bottom-right">
          <img src={image1} alt="Facebook" />
          <img src={image2} alt="Instagram" />
          
          <span className="separator-left">|</span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;