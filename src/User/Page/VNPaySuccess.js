import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../Css/VNPaySuccess.css';
import { add_order } from '../../Service/OrderService';

const VNPaySuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const hasProcessed = useRef(false); // Ngăn gọi lại nhiều lần

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    const vnp_TxnRef = searchParams.get("vnp_TxnRef");
    const vnp_Amount = searchParams.get("vnp_Amount");

    setOrderId(vnp_TxnRef);
    setAmount(Number(vnp_Amount) / 100);

    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

    if (vnp_ResponseCode === "00") {
      if (checkoutData) {
        handleCreateOrder(checkoutData);
      } else {
        setStatus("error");
        setMessage("Thanh toán thành công nhưng không tìm thấy dữ liệu đơn hàng. Vui lòng liên hệ hỗ trợ.");
        setLoading(false);
      }
    } else {
      setStatus("error");
      setMessage("Thanh toán thất bại hoặc bị hủy. Đơn hàng chưa được tạo.");
      setLoading(false);
    }
  }, []);

  const handleCreateOrder = async (checkoutData) => {
    try {
      const res = await add_order(checkoutData);

      if (res.status === 200) {
        setStatus("success");
        setMessage("Bạn đã thanh toán và đặt hàng thành công. Cảm ơn bạn đã tin tưởng!");
        localStorage.removeItem("checkoutData");
      } else {
        setStatus("error");
        setMessage("Thanh toán thành công nhưng tạo đơn hàng thất bại. Vui lòng liên hệ hỗ trợ.");
      }
    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      setStatus("error");
      setMessage("Đã thanh toán nhưng tạo đơn hàng thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vnpay-success-container">
      <div className="vnpay-card">
        {loading ? (
          <p>Đang xử lý thanh toán...</p>
        ) : status === 'success' ? (
          <>
            <div className="success-icon">✓</div>
            <h2 className="title-success">Thanh toán thành công!</h2>
            <p className="message">{message}</p>
            <div className="order-info">
              <p><strong>Mã đơn hàng:</strong> {orderId}</p>
              <p><strong>Số tiền:</strong> {amount.toLocaleString()} VNĐ</p>
            </div>
            <Link to="/" className="btn-back">Quay lại trang chủ</Link>
          </>
        ) : (
          <>
            <div className="error-icon">✖</div>
            <h2 className="title-error">Thanh toán thất bại</h2>
            <p className="message">{message}</p>
            <Link to="/" className="btn-back">Thử lại hoặc quay về</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VNPaySuccessPage;
