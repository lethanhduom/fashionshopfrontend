import React, { useEffect, useState, useRef } from 'react';
import "../Css/Chat.css";

const Chat = ({ currentUser, receiverUser,id_product  }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const socket = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
   
    // Kết nối WebSocket
    socket.current = new WebSocket(`ws://localhost:8082/identity/chat?userId=${currentUser?.id}`);

    socket.current.onopen = () => {
      console.log('Kết nối WebSocket thành công');
      fetchHistory(); // Load lịch sử khi mở
    };

    socket.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      
      // Kiểm tra nếu dữ liệu nhận về là một mảng, nếu không thì gửi theo kiểu mặc định
      if (Array.isArray(msg)) {
        setMessages(msg);
      } else {
        setMessages((prev) => [...prev, msg]); // Thêm tin nhắn mới vào cuối
      }
    };

    socket.current.onclose = () => console.log('Đã đóng WebSocket');
    socket.current.onerror = (err) => console.error('Lỗi WebSocket:', err);

    return () => {
      socket.current.close();
    };
  }, [currentUser?.id]);

  // Lấy lịch sử tin nhắn
  const fetchHistory = async () => {
    let data;;
    if(currentUser?.role==="admin"){
      const res = await fetch(`http://localhost:8082/identity/api/chat/history?userId=${receiverUser?.id}&productId=${id_product}`);
      data = await res.json();
  
    }else{
      const res = await fetch(`http://localhost:8082/identity/api/chat/history?userId=${currentUser?.id}&productId=${id_product}`);
       data = await res.json();
    }
    

    // Kiểm tra nếu dữ liệu trả về là một mảng, nếu không gán mảng rỗng
    if (Array.isArray(data)) {
      setMessages(data);
    } else {
      console.error("Dữ liệu không phải là mảng");
      setMessages([]);
    }
  };

  // Gửi tin nhắn
  const sendMessage = () => {

   
    if (content.trim() === '') return;

    const message = {
      senderId: currentUser.id,
      receiverId: receiverUser.id, // luôn gửi đến admin
      productId: id_product, // Hoặc truyền product thực tế
      content: content,
    };

    socket.current.send(JSON.stringify(message)); // Gửi tin nhắn qua WebSocket
    setContent(''); // reset nội dung sau khi gửi
  };

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat với {currentUser?.role==="admin"? 'User' : 'Admin'}
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.senderId === currentUser?.id ? 'sent' : 'received'}`}
          >
            <div className="chat-content">{msg.content}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-footer">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default Chat;
