import React, { useState } from "react";
import "../Css/ReviewModal.css";

const ReviewModal = ({ product, onClose, onSubmit }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleStarClick = (value) => {
    setStars(value);
  };

  const handleSubmit = () => {
  
    if (stars === 0 ) return;
    onSubmit(product.id_product_detail, stars, comment);
    setStars(0);
    setComment("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Đánh giá: {product.nameProduct}</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={s <= stars ? "star filled" : "star"}
              onClick={() => handleStarClick(s)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Viết bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Hủy</button>
          <button onClick={handleSubmit}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
