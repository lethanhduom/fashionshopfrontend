import React, { useEffect, useState } from 'react';
import "../Css/HistoryPurchase.css";
import { getInforUser } from '../../Service/AuthenService';
import { getPurchaseByUser, handleReturnOrder } from '../../Service/OrderService';
import { useNavigate } from "react-router-dom";
import ReturnModal from './ReturnModal';
import Swal from 'sweetalert2';
const MyPurchase = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [orderData, setOrderData] = useState([]);
  const [isModalReturnOpen, setIsModalReturnOpen] = useState(false);
  const [statusReturn,setStatusReturn]=useState();
  const [productReturn,setProductReturn]=useState();
  const [change,setChange]=useState(0);
  const navigate = useNavigate();
  const filteredOrders = orderData.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ordered') return order.status === 0 || order.status === 1;
    if (activeTab === 'shipping') return order.status === 2;
    if (activeTab === 'received') return order.status === 3;
    if (activeTab === 'completed') return order.status === 4;
    if (activeTab === 'canceled') return order.status === 5;
    if (activeTab === 'returned') return order.status === 6;
    return false;
  });

  const convertStatusToString = (status) => {
    return status === 0 || status === 1 ? "Ordered" :
           status === 2 ? "Shipping" :
           status === 3 ? "Received" :
           status === 4 ? "Completed" :
           status === 5 ? "Canceled" : "Returned";
  };
  const handleClickDetail=(id)=>{
    navigate(`/order-detail/${id}`);
  }

  
  const handleSubmitReturn = async(data) => {
        Swal.fire({
              title: `Are you sure ${data.status===5?"Cancel":"Return"} this order?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'YES',
              cancelButtonText: 'NO'
            }).then(async (result) => { // Thêm async vào hàm callback
              if (result.isConfirmed) {
               
                try {
                    const response= await handleReturnOrder(data.product,data.status,data.reason,data.descrption)
                  if (response.status === 200) {
                    Swal.fire(
                      'Successful',
                      `${data.status===5?"Cancel":"Return"} Successfully`,
                      'success'
                    );
                    setChange((prev)=>(prev+1))
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error!',
                      text: 'Something went wrong, Please try Again',
                    });
                  }
                } catch (error) {
                  console.error('Lỗi:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Cannot Return this order',
                  });
                }
              }
            });
  };



  const handleClickCancel=(id_order)=>{
    setStatusReturn(5);
    setProductReturn(id_order)
    setIsModalReturnOpen(true);

  }
  const handleClickReturn=(id_order)=>{
    setStatusReturn(6);
    setProductReturn(id_order)
    setIsModalReturnOpen(true);

  }

  useEffect(() => {
    const fetchData = async () => {
      const username =JSON.parse(localStorage.getItem('user'));
      const res1 = await getInforUser(username.sub);
      const res2 = await getPurchaseByUser(res1.data.id);
      setOrderData(res2.data);
    };
    fetchData();
  }, [change]);

  return (
    <div className="purchase-page">
      <div className="tab-container">
        {['all', 'ordered', 'shipping', 'received', 'completed', 'canceled', 'returned'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="orders-container">
        <h2>Your Orders</h2>
        {filteredOrders.map(order => (
          <div key={order.id_order} className="order-card">
            <div className="order-header">
              <span className={`status ${convertStatusToString(order.status)}`}>
                {convertStatusToString(order.status)}
              </span>
              <div className="order-info">
                <p>Order ID: #{order.id_order}</p>
                <p>Recipient: {order.recipientName}</p>
                <p>Phone: {order.phoneNumber}</p>
              </div>
              <div className="delivery-info">
                <p>Ship To: {order.address}</p>
                <p>Payment: {order.paymentMethod}</p>
              </div>
            </div>

            <div className="order-items">
              {order.detailOrders.map((item, index) => (
                <div key={index} className="item">
                  <img src={item.image_url} alt={item.nameProduct} className="item-image" />
                  <div className="item-details">
                    <p className="item-name">{item.nameProduct}</p>
                    {item.size && <p className="item-size">Size: {item.size}</p>}
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">{item.price.toFixed(2)}đ</p>
                  
                </div>
              ))}
            </div>

            <div className="order-footer">
            <p className="total-amount">Total Amount : {order.totalPrice.toFixed(2)}đ</p>
            <div className="order-buttons">
              <button onClick={() => handleClickDetail(order.id_order)} className="purchase-btn">View Detail</button>
             {order.status===3&& <button  className="purchase-btn">Confirm</button>}
             {order.status===3&& <button onClick={()=>handleClickReturn(order.id_order)}  className="purchase-btn">Return</button>}
             {(order.status===1||order.status===0) && <button onClick={() =>handleClickCancel(order.id_order)} className="purchase-btn">Cancel</button>}
            </div>
          </div>
          </div>
        ))}

        {filteredOrders.length === 0 && <p>No orders found for the selected tab.</p>}
      </div>
      <ReturnModal
        isOpen={isModalReturnOpen}
        onClose={() => setIsModalReturnOpen(false)}
        onSubmit={handleSubmitReturn}
        product={productReturn}
        status={statusReturn}
      />
    </div>
  );
};

export default MyPurchase;
