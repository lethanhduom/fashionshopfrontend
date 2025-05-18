import React from "react";
import Header from "../Component/Header";
import Cart from "../Component/ShoppingCart";
import "../Css/OrderTrackingPage.css"
import OrderTracking from "../Component/OrderTracking";
const OrderTrackingPage=()=>{
    const cashPaymentTimeline = {
        ordered: "20:10 10-02-2025",
        shipped: "18:52 11-02-2025",
        delivered: "19:19 13-02-2025",
        completed: "23:59 15-03-2025"
      };
    return (
        <div className="order-tracking-space">
            <Header/>
            <div className="order-tracking-detail-space">
            <OrderTracking 
        paymentMethod="paid" 
        currentStatus={4} 
      />
            </div>
        </div>
        
    )
}
export default OrderTrackingPage;