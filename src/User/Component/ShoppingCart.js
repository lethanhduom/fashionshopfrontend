import React, { useEffect, useState } from 'react';
import "../Css/ShoppingCart.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { addCart, deleteCartItem, listCart } from '../../Service/CartService';
import { getIdCart } from '../../Service/AuthenService';
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const resCartId = await getIdCart(user.sub);
        const cartId = resCartId.data;
        const res = await listCart(cartId);

        if (res.data && res.data.length > 0) {
          setCartItems(res.data);
          setSelectedItems(res.data.map(item => item.id_cart_item));
        } else {
          setCartItems([]); // Nếu giỏ hàng trống, set cartItems là mảng rỗng
        }
      } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err);
      }
    };

    fetchCart();
  }, [change]);

  const allSelected = selectedItems.length === cartItems.length;

  const toggleSelectAll = () => {
    setSelectedItems(allSelected ? [] : cartItems.map(item => item.id_cart_item));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const updateQuantity = async (id_cart_item, id_cart, id_product_detail, delta, quantity) => {
    if (quantity === 1 && delta === -1) {
      await deleteCartItem(id_cart_item);
    } else {
      const updateQuantity = {
        "id_cart_item": id_cart_item,
        "quantity": delta,
        "cart_id": id_cart,
        "id_product_detail": id_product_detail
      };
      await addCart(updateQuantity);
    }

    setChange(() => change + 1);
  };

  const deleteItem = (id) => {
    deleteCartItem(id);
    setChange(() => change + 1);
  };

  const getTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id_cart_item))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePayment = () => {
    const selectedCartItems = cartItems.filter(item =>
      selectedItems.includes(item.id_cart_item)
    );
    navigate("/check-out", { state: { selectedItems: selectedCartItems } });
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng của bạn hiện tại đang trống.</p>
        </div>
      ) : (
        <>
          <div className="cart-select-all">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <span>Select All Products</span>
          </div>

          {cartItems.map(item => (
            <div key={item.id_cart_item} className="cart-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id_cart_item)}
                onChange={() => toggleSelectItem(item.id_cart_item)}
              />
              <img src={item.image} alt={item.name} className="product-img" />
              <div className="item-info">
                <strong>{item.name}</strong>
                <div>
                  Size: {item.size} |
                  <span className="color-circle" style={{ backgroundColor: item.color }} />
                </div>
                <div>₫{item.price.toLocaleString()}</div>
              </div>

              <div className="item-info">
                <strong>Thành tiền</strong>
                <div>₫{(item.price * item.quantity).toLocaleString()}</div>
              </div>

              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id_cart_item, item.id_cart, item.id_product_detail, -1, item.quantity)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id_cart_item, item.id_cart, item.id_product_detail, 1, item.quantity)}>+</button>
              </div>

              <button className="btn-outline" onClick={() => deleteItem(item.id_cart_item)}>
                <ClearOutlinedIcon />
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <strong>Tổng tiền: ₫{getTotal().toLocaleString()}</strong>
            <button onClick={handlePayment} className="btn-outline">
              <ShoppingCartOutlinedIcon />
              &nbsp;Thanh toán tất cả
            </button>
          </div>
        </>
      )}
    </div>
  );
}
