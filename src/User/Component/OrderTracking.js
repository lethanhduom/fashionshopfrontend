import React from "react";
import {
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaBoxOpen,
  FaCheckCircle
} from "react-icons/fa";
import "../Css/OrderTracking.css";

const OrderTracking = ({ paymentMethod, currentStatus }) => {
  const statusConfig = [
    {
      id: 0,
      label: "Ordered Successfully",
      color: "#FF9800",
      icon: <FaShoppingCart className="status-icon" />
    },
    {
      id: 1,
      label: "Order Paid Successfully",
      color: "#FF9800",
      icon: <FaCreditCard className="status-icon" />
    },
    {
      id: 2,
      label: "Order Shipped Out",
      color: "#FF9800",
      icon: <FaTruck className="status-icon" />
    },
    {
      id: 3,
      label: "Order Receive",
      color: "#FF9800",
      icon: <FaBoxOpen className="status-icon" />
    },
    {
      id: 4,
      label: "Order Complete",
      color: "#FF9800",
      icon: <FaCheckCircle className="status-icon" />
    }
  ];

  const isCash = paymentMethod === "COD";
  const visibleStatuses = isCash
    ? statusConfig.filter((status) => status.id !== 1)
    : statusConfig;

  const adjustedCurrentStatus = isCash && currentStatus > 1
    ? currentStatus - 1
    : currentStatus;

  return (
    <div className="order-tracking-container">
      <div className="progress-bar">
        {visibleStatuses.map((status, index) => {
          const isCompleted = index < adjustedCurrentStatus;
          const isActive = index === adjustedCurrentStatus;
          const hasLine = index < visibleStatuses.length - 1;

          return (
            <React.Fragment key={status.id}>
              <div
                className={`step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                style={{
                  '--active-color': status.color,
                  '--completed-color': status.color
                }}
              >
                <div className="step-icon">
                  <div className={`icon-wrapper ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}>
                    {status.icon}
                  </div>
                </div>
                <div className="step-label">{status.label}</div>
              </div>

              {hasLine && (
                <div
                  className={`connector ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                  style={{
                    '--active-color': status.color,
                    '--completed-color': status.color
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
