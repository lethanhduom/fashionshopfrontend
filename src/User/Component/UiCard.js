import React, { useState } from "react";
import "../Css/Product.css";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="card">
      <div className="image-slider">
        <button className="nav-btn left" onClick={prevImage}>❮</button>
        <img src={product.images[currentIndex]} alt="Room" className="room-image" />
        <button className="nav-btn right" onClick={nextImage}>❯</button>
        <div className="heart">
        <Heart fill={false ? "black" : "white"} color="black" size={20} />
        </div>
      </div>
      <div className="profile-pic">
        <img src={product.ownerImage} alt="Owner" />
      </div>
      <div className="card-content">
        <h3>{product.nameProduct}</h3>
  
       
        <p><strong>{product.price} VND </strong></p>
        <span className="rating">★ {product.rate}</span>
      </div>
    </div>
  );
};

export default ProductCard;
