import React, { useEffect, useState } from "react";
import "../Css/Checkout.css";
import { removeVietnameseTones } from "./removeVietnamese";
import { useLocation } from "react-router-dom";
import CitySelector from "./CitySelector";
import { add_order, calculate_fee, getlinkVNPay } from "../../Service/OrderService";
import { getInforUser } from "../../Service/AuthenService";
import Swal from "sweetalert2";
import { getListCouponActive } from "../../Service/CouponService";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [productCoupon, setProductCoupon] = useState("");
  const [shippingCoupon, setShippingCoupon] = useState("");
  const [selectedProductCoupon, setSelectedProductCoupon] = useState("");
  const [selectedShippingCoupon, setSelectedShippingCoupon] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [shippingDiscount, setShippingDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: "Đang tải dữ liệu...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.sub) {
          Swal.fire("Lỗi", "Vui lòng đăng nhập để tiếp tục", "error");
          return;
        }

        const [responseInfo, responseCoupon] = await Promise.all([
          getInforUser(user.sub),
          getListCouponActive(),
        ]);

        if (responseInfo.status === 200 && responseCoupon.status === 200) {
          const info = responseInfo.data;
          setUserInfo(info);
          setAvailableCoupons(responseCoupon.data);
          if (info.address) {
            const fee = await calculate_fee(info.address);
            setShippingFee(fee.data.shipping_fee || 0);
          }
        } else {
          throw new Error("Không thể tải dữ liệu");
        }

        if (location.state?.selectedItems) {
          setCart(location.state.selectedItems);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        Swal.fire("Lỗi", "Không thể tải thông tin người dùng hoặc mã giảm giá", "error");
      } finally {
        Swal.close();
      }
    };

    fetchData();
  }, [location.state]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Hàm áp dụng mã giảm giá, sửa để xử lý dropdown
  const applyCoupon = (code, category) => {
    const trimmed = code.trim();
    if (!trimmed) {
      Swal.fire("Lỗi", "Vui lòng nhập mã giảm giá", "error");
      return;
    }

    // Kiểm tra mã đã áp dụng
    if (category === "product" && productCoupon === trimmed) {
      Swal.fire("Thông báo", "Mã giảm giá sản phẩm này đã được áp dụng", "info");
      return;
    }
    if (category === "shipping" && shippingCoupon === trimmed) {
      Swal.fire("Thông báo", "Mã giảm giá vận chuyển này đã được áp dụng", "info");
      return;
    }

    // So sánh không phân biệt hoa thường
    const found = availableCoupons.find(
      (c) => c.code.toUpperCase() === trimmed.toUpperCase() && c.category === category
    );
    const today = new Date();

    if (!found) {
      if (category === "product") setProductDiscount(0);
      if (category === "shipping") setShippingDiscount(0);
      console.log(`Mã ${trimmed} không tìm thấy cho category ${category}`);
      Swal.fire("Lỗi", `Mã ${trimmed} không tồn tại cho ${category === "product" ? "sản phẩm" : "vận chuyển"}`, "error");
      return;
    }

    const start = new Date(found.startDate);
    const end = new Date(found.endDate);
    const isInDateRange = today >= start && today <= end;
    const meetsMinValue = totalPrice >= found.minOrderValue;

    if (!isInDateRange) {
      Swal.fire("Lỗi", `Mã ${found.code} không còn hiệu lực`, "error");
      return;
    }

    if (!meetsMinValue) {
      Swal.fire(
        "Lỗi",
        `Đơn hàng phải từ ${found.minOrderValue.toLocaleString()}đ để dùng mã ${found.code}`,
        "error"
      );
      return;
    }

    if (found.decreaseCrash < 0 || found.decreasePercent < 0) {
      Swal.fire("Lỗi", "Mã giảm giá không hợp lệ", "error");
      return;
    }

    let discountAmount = 0;
    if (found.typeCode === "percent") {
      discountAmount = (totalPrice * found.decreasePercent) / 100;
    } else if (found.typeCode === "fixed") {
      discountAmount = found.decreaseCrash;
    }

    if (category === "product") {
      setProductDiscount(discountAmount);
      setProductCoupon(found.code);
      setSelectedProductCoupon(found.code);
    }
    if (category === "shipping") {
      setShippingDiscount(discountAmount);
      setShippingCoupon(found.code);
      setSelectedShippingCoupon(found.code);
    }

    Swal.fire("Thành công", `Áp dụng mã ${found.code} thành công!`, "success");
  };

  const finalShippingFee = Math.max(shippingFee - shippingDiscount, 0);
  const finalPrice = Math.max(totalPrice + finalShippingFee - productDiscount, 0);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ", "error");
      return;
    }

    if (!cart.length) {
      Swal.fire("Lỗi", "Giỏ hàng trống", "error");
      return;
    }

    const orderPayload = {
      orderDetails: cart.map((item) => ({
        id_product_detail: item.id_product_detail,
        price: item.price,
        quantity: item.quantity,
        id_cart_item: item.id_cart_item,
      })),
      totalPrice: totalPrice + shippingFee,
      totalPriceProduct: totalPrice,
      totalPriceCoupon: finalPrice,
      productFeeCoupon: productDiscount,
      shipFeeCoupon: shippingDiscount,
      shipFee: shippingFee,
      status: 0,
      couponProductId: productCoupon,
      couponShipppingId: shippingCoupon,
      paymentMethod: paymentMethod,
      phoneNumber: userInfo.phone,
      address: userInfo.address,
      username: userInfo.username || "",
      recipientName: userInfo.name,
    };

    try {
      if (paymentMethod === "COD") {
        const response = await add_order(orderPayload);
        if (response.status === 200) {
          Swal.fire("Thành công", "Đặt hàng thành công!", "success");
          navigate("/history-purchase");
        } else {
          Swal.fire("Lỗi", "Đặt hàng thất bại", "error");
        }
      } else {
        const amount = finalPrice.toString();
        const url_response = await getlinkVNPay(amount);
        if (url_response?.data?.paymentUrl) {
          localStorage.setItem("checkoutData", JSON.stringify({ ...orderPayload, status: 1 }));
          window.location.href = url_response.data.paymentUrl;
        } else {
          Swal.fire("Lỗi", "Không thể tạo liên kết thanh toán", "error");
        }
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      Swal.fire("Lỗi", "Không thể kết nối tới server", "error");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Thanh toán</h1>

      <div className="checkout-cart">
        {cart.length ? (
          cart.map((item) => (
            <div key={item.id_product_detail} className="checkout-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>
                  {item.quantity} x {item.price.toLocaleString()}đ
                </p>
              </div>
              <div className="item-price">
                {(item.price * item.quantity).toLocaleString()}đ
              </div>
            </div>
          ))
        ) : (
          <p>Giỏ hàng trống</p>
        )}
      </div>

      <div className="coupon-section">
        <strong>Mã giảm giá sản phẩm:</strong>
        <select
          value={selectedProductCoupon}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedProductCoupon(value);
            setProductCoupon(value);
            if (value) applyCoupon(value, "product");
          }}
        >
          <option value="">-- Chọn mã giảm giá sản phẩm --</option>
          {availableCoupons
            .filter((c) => c.category === "product")
            .map((c) => (
              <option key={c.id_coupon} value={c.code}>
                {c.code}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Hoặc nhập mã giảm giá sản phẩm"
          value={productCoupon}
          onChange={(e) => {
            setProductCoupon(e.target.value);
            setSelectedProductCoupon("");
          }}
        />
        <button onClick={() => applyCoupon(productCoupon, "product")}>Áp dụng</button>
      </div>

      <div className="coupon-section">
        <strong>Mã giảm giá phí ship:</strong>
        <select
          value={selectedShippingCoupon}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedShippingCoupon(value);
            setShippingCoupon(value);
            if (value) applyCoupon(value, "shipping");
          }}
        >
          <option value="">-- Chọn mã freeship --</option>
          {availableCoupons
            .filter((c) => c.category === "shipping")
            .map((c) => (
              <option key={c.id_coupon} value={c.code}>
                {c.code}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Hoặc nhập mã freeship"
          value={shippingCoupon}
          onChange={(e) => {
            setShippingCoupon(e.target.value);
            setSelectedShippingCoupon("");
          }}
        />
        <button onClick={() => applyCoupon(shippingCoupon, "shipping")}>Áp dụng</button>
      </div>

      <div className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={userInfo.name || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={userInfo.phone || ""}
          onChange={handleInputChange}
        />
        <label>
          <strong>Chọn địa chỉ giao hàng:</strong>
        </label>
        <CitySelector
          selectedCity={removeVietnameseTones(userInfo.address?.split(",")[0] || "")}
          onSelect={async (city) => {
            const updatedAddress = city;
            Swal.fire({
              title: "Đang tính phí vận chuyển...",
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading(),
            });
            try {
              setUserInfo({ ...userInfo, address: updatedAddress });
              const fee = await calculate_fee(updatedAddress);
              setShippingFee(fee.data.shipping_fee || 0);
            } catch (error) {
              console.error("Lỗi khi tính phí:", error);
              Swal.fire("Lỗi", "Không thể tính phí vận chuyển", "error");
            } finally {
              Swal.close();
            }
          }}
        />
        <p>
          <i>Địa chỉ đã chọn: {userInfo.address || "Chưa chọn"}</i>
        </p>

        <div className="checkout-summary">
          <div className="checkout-total">
            <span>Tổng tiền hàng:</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>
          <div className="checkout-total">
            <span>Phí vận chuyển:</span>
            <span>{shippingFee.toLocaleString()}đ</span>
          </div>
          {shippingDiscount > 0 && (
            <div className="checkout-total">
              <span>Giảm giá phí vận chuyển:</span>
              <span>
                -{(shippingFee > shippingDiscount ? shippingDiscount : shippingFee).toLocaleString()}đ
              </span>
            </div>
          )}
          {productDiscount > 0 && (
            <div className="checkout-total">
              <span>Voucher từ sản phẩm:</span>
              <span>-{productDiscount.toLocaleString()}đ</span>
            </div>
          )}
          <div className="checkout-total total-highlight">
            <span>
              <strong>Thành tiền:</strong>
            </span>
            <span className="total-amount">{finalPrice.toLocaleString()}đ</span>
          </div>
        </div>

        <div className="payment-method">
          <label>
            <strong>Phương thức thanh toán:</strong>
          </label>
          <div>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Thanh toán khi nhận hàng (COD)
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="BANK_TRANSFER"
                checked={paymentMethod === "BANK_TRANSFER"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>

        <button onClick={handleOrder}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default CheckoutPage;