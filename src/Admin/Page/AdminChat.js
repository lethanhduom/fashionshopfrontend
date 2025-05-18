import React, { useEffect, useState } from 'react';
import "../Css/AdminChat.css";
import AdminLayout from '../Component/AdminLayout';
import Chat from '../../User/Page/Chat';
import { getInforUser } from '../../Service/AuthenService';

const AdminChat = ({ currentUserId = 5 }) => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminData,setAdminData]=useState({});

    const  [receiveUser,setReceiveUser]=useState({});
    const  [currentUser,setCurrentUser]=useState({});
    const  [idProduct,setIdProduct]=useState(0);
    const handleOnclickChat=(user)=>{
      setCurrentUser({
        "id":adminData.id,
        "role":"admin"
      });
      setReceiveUser({
        "id":user.id_user,
        "role":"user"
      });
     setIdProduct(user.id_product);
     setSelectedUser(user);
    }
  useEffect(() => {

    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem('admin'));
      const res = await fetch(`http://localhost:8082/identity/api/chat/get-users`);
      const data = await res.json();
      const res1=await getInforUser(admin.sub);
      setAdminData(res1.data);
      setUserList(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách user:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-chat-container">
        <div className="user-list">
          <h3>Người dùng đã chat</h3>
          {userList.length === 0 ? (
            <p>Chưa có người dùng nào nhắn tin.</p>
          ) : (
            userList.map((user) => (
              <div key={user.id_product} className="user-item">
                <span>{user.fullname} (ID: {user.productName})</span>
                <button onClick={() => handleOnclickChat(user) }>Chat</button>
              </div>
            ))
          )}
        </div>

        <div className="chat-box">
          {selectedUser ? (
            <Chat currentUser={currentUser} receiverUser={ receiveUser} id_product={idProduct}/>
          ) : (
            <div className="no-chat-selected">Chọn người dùng để bắt đầu chat</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminChat;
