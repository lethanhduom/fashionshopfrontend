import React, { useEffect, useState } from "react";
import "../Css/OrderDetail.css";
import { useParams } from "react-router-dom";
import { getDetailOrder } from "../../Service/OrderService";
import OrderTracking from "./OrderTracking";
import { Button } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReviewModal from "./ReviewModal";
import { createReview } from "../../Service/CommentService";
import Swal from 'sweetalert2';
import { getSentiment } from "../../Service/AIService";
const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { id_order } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailOrder(id_order);
        setOrder(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };
    fetchData();
  }, [id_order]);

  const formatCurrency = (number) =>
    number?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (!order) {
    return <div className="order-loading">Loading order detail...</div>;
  }

  const handleSubmitReview = async (productId, stars, comment) => {
    try{
    const sentiment=await getSentiment(comment);
    let emotion;
    if(sentiment.status===200){
       emotion=sentiment.data.sentiment==="NEG"?0:sentiment.data.sentiment==="POS"?1:2;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const data={
      "review":comment,
      "id_product_detail":productId,
      "username":user.sub,
      "rate":stars,
      "emotion":emotion
    }
    const res= await createReview(data);
    if(res.status===200||res.status===201){
      Swal.fire(
        'Successful',
        'Your Review has been pushed',
        'success'
      );
    }

    setShowModal(false);
  }catch(error){
    console.error(error);
  }
  };
  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  

  return (
    <div className="order-detail-container">
      {/* Left Info */}
      <div className="order-detail-left">
        <div className="section">
          <h2>{order.recipientName}</h2>
          <p>{order.username}@gmail.com</p>
        </div>
        <div className="section">
          <h3>Payment Method</h3>
          <p>
            {order.paymentMethod === "BANK_TRANSFER"
              ? "Bank Transfer"
              : order.paymentMethod}
          </p>
        </div>
        <div className="section">
          <h3>Shipping Address</h3>
          <p>{order.address}</p>
        </div>
        <div className="section">
          <h3>Phone Number</h3>
          <p>{order.phoneNumber}</p>
        </div>
      </div>

      {/* Right Detail */}
      <div className="order-detail-right">
        <h2>Order ID: {order.id_order}</h2>
        <p className="order-status">Thank you. Your order has been confirmed.</p>

        <OrderTracking
        paymentMethod={order.paymentMethod}
        currentStatus={order.status} 
      />

        {/* Product Listing */}
        <div className="product-section">
          <h3>Product Listing</h3>
          {order.detailOrders?.map((item) => (
            <div className="product-item" key={item.id_order_detail}>
              <div className="product-info">
                <img src={item.image_url} alt={item.nameProduct} />
                <div>
                  <p className="product-name">{item.nameProduct}</p>
                  <p>Size: {item.size}</p>
                  <p className="color-wrapper">
                    Color:
                    <span
                      className="color-box"
                      style={{ backgroundColor: item.color }}
                    />
                  </p>
                </div>
              </div>
              <div className="product-price">
                <p>Quantity: {item.quantity}</p>
                <p>{formatCurrency(item.price)}</p>
              </div>
              {order.status === 4 && (
      <div className="comment-button-wrapper">
      <Button  onClick={() => handleOpenReview(item)} variant="outlined"> <EditNoteIcon/></Button> 
      </div>
    )}
            </div>

          ))}
        </div>

        {/* Total Section */}
        <div className="total-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>{formatCurrency(order.totalPriceProduct)}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>{formatCurrency(order.shipFee)}</span>
          </div>
          <div className="total-row total-final">
            <span>Total</span>
            <span>{formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
      </div>
      {showModal && (
        <ReviewModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default OrderDetail;
