import React from "react";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

const QuantitySelector = ({ quantity, setQuantity, max }) => {
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < max) setQuantity(quantity + 1);
  };

  return (
    <div style={{ marginTop: 25 }}>
      <label style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}>Select Quantity:</label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: "6px 12px",
          width: "fit-content",
          background: "#fff",
        }}
      >
        <button
          onClick={handleDecrease}
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "#f3f4f6",
            border: "1px solid #ccc",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IndeterminateCheckBoxIcon fontSize="small" />
        </button>
        <span style={{ minWidth: 20, textAlign: "center", fontWeight: "500" }}>{quantity}</span>
        <button
          onClick={handleIncrease}
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "#f97316",
            color: "#000",
            border: "1px solid #f97316",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddBoxIcon fontSize="small" />
        </button>
        <span style={{ fontSize: 12, color: "#6b7280" }}>Maximum: {max}</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
