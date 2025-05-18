import React, { useState } from "react";
import "../Css/ReturnModal.css";
import Swal from 'sweetalert2';
const ReturnModal = ({ isOpen, onClose, onSubmit, product,status }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!reason) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Please Select Reason To ${status===5?"Cancel":"Return"}`,
          });
      return;
    }
    onSubmit({ reason, description, product,status });
    setReason("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Hoàn hàng - {product?.name}</h2>

        <label>Lý do hoàn hàng:</label>
      {status===6&&  <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">-- Chọn lý do --</option>
          <option value="Wrong product">Wrong product</option>
          <option value="Defective product">Defective product</option>
          <option value="Not statisfied">Not satisfied</option>
          <option value="Other">Other</option>
        </select>
      }
      {status===5&&  <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">-- Chọn lý do --</option>
          <option value="Changed my mind">Changed my mind</option>
          <option value="Ordered the wrong product or quantity">Ordered the wrong product or quantity</option>
          <option value="Delivery time is too long">Delivery time is too long</option>
          <option value="Other">Other</option>
        </select>
      }

        <label>Mô tả chi tiết (nếu có):</label>
        <textarea
          placeholder="Nhập chi tiết yêu cầu hoàn hàng..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>Hủy</button>
          <button className="btn submit" onClick={handleSubmit}>Gửi yêu cầu</button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
