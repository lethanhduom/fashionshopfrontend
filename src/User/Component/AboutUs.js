import React from 'react';
import "../Css/AboutUs.css"
// Import illustration images (you'll need to add these to your project)
import heroImage from '../../Image/hero_image.avif';
import sustainabilityIcon from '../../Image/sustainability.jpg';
import craftsmanshipIcon from '../../Image/craftsmanship.jpg';
import designIcon from '../../Image/design.jpg';
import sizingIcon from '../../Image/sizing.jpg';
import designer1 from '../../Image/design1.jpg';
import designer2 from '../../Image/design2.jpg';
import parisianNights from '../../Image/parisian_nights.jpg';
import urbanMinimalist from '../../Image/urban_minimalist.jpg';
import bohemian from '../../Image/bohemian.jpg';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(255, 246, 241, 0.8), rgba(255, 246, 241, 0.8)), url(${heroImage})` }}>
        <h1>Our Fashion Story</h1>
        <p className="hero-text">
          Dilys Store, we believe fashion is an expression of individuality. 
          Since 2010, we've been crafting timeless pieces that blend contemporary 
          trends with classic sophistication.
        </p>
      </section>

      {/* Brand Pillars */}
      <section className="brand-pillars">
        <h2 className="section-title">Our Design Philosophy</h2>
        <div className="pillars-grid">
          <div className="pillar">
            <div className="pillar-icon">
              <img src={sustainabilityIcon} alt="Sustainability" />
            </div>
            <h3>Sustainable Materials</h3>
            <p>Ethically sourced fabrics that respect our planet</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">
              <img src={craftsmanshipIcon} alt="Craftsmanship" />
            </div>
            <h3>Artisan Craftsmanship</h3>
            <p>Hand-finished details for exceptional quality</p>
          </div>
          <div className="pillar">
            <div className="pillar-icon">
              <img src={designIcon} alt="Timeless Design" />
            </div>
            <h3>Timeless Designs</h3>
            <p>Pieces that transcend seasonal trends</p>
          </div>
          
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Our Story */}
      <section className="our-story">
        <h2 className="section-title">Why My Store Stands Out</h2>
        <p className="story-text">
          Founded in Paris and now spanning 3 continents, Élégance brings European 
          sophistication to global fashion. Our atelier combines traditional techniques 
          with innovative design to create wearable art.
        </p>

        <div className="vision-mission">
          <div className="vm-card">
            <div className="vm-image vision-image"></div>
            <h3>Our Vision</h3>
            <p>
              To redefine luxury fashion by creating beautiful, sustainable clothing 
              that empowers individuals while respecting our planet.
            </p>
          </div>
          <div className="vm-card">
            <div className="vm-image mission-image"></div>
            <h3>Our Mission</h3>
            <p>
              To craft exceptional garments using eco-friendly materials and ethical 
              practices, offering timeless style with a clear conscience.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Collections */}
      <section className="collections">
        <h2 className="section-title">Signature Collections</h2>
        
        <div className="collection">
          <div className="collection-image" style={{ backgroundImage: `url(${parisianNights})` }}></div>
          <div className="collection-content">
            <h3>Parisian Nights</h3>
            <p>
              Evening wear that captures the romance of Paris with luxurious silks 
              and delicate embroidery.
            </p>
            
          </div>
        </div>
        
        <div className="collection">
          <div className="collection-image" style={{ backgroundImage: `url(${urbanMinimalist})` }}></div>
          <div className="collection-content">
            <h3>Urban Minimalist</h3>
            <p>
              Clean lines and structured silhouettes for the modern professional.
            </p>
            
          </div>
        </div>
        
        <div className="collection">
          <div className="collection-image" style={{ backgroundImage: `url(${bohemian})` }}></div>
          <div className="collection-content">
            <h3>Bohemian Rhapsody</h3>
            <p>
              Flowing fabrics and earthy tones inspired by global travels.
            </p>
         
          </div>
        </div>
      </section>

      {/* Creative Team */}
      <section className="creative-team">
        <h2 className="section-title">Meet Our Designers</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-photo" style={{ backgroundImage: `url(${designer1})` }}></div>
            <h3>Sophie Laurent</h3>
            <p className="role">Creative Director</p>
            <p className="bio">
              Paris-born designer with 15 years experience in haute couture. 
              Specializes in evening wear and bridal collections.
            </p>
          </div>
          <div className="team-member">
            <div className="member-photo" style={{ backgroundImage: `url(${designer2})` }}></div>
            <h3>Marco Bianchi</h3>
            <p className="role">Head of Design</p>
            <p className="bio">
              Milan-trained designer focused on sustainable materials and 
              innovative fabric technologies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;