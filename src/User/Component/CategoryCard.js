import React from 'react';
import "../Css/CategoryCard.css";

const CategoryCard = ({ image, title, description, onClick }) => {
  return (
    <div className="service-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#">VIEW MORE</a>
    </div>
  );
};

export default CategoryCard;
