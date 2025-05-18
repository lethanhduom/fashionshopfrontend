import React, { useState, useRef, useEffect } from "react";
import "../Css/ChatAIModal.css";
import { CloudMoon } from 'lucide-react';
import { chatWithAI } from "../../Service/AIService";
const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
    // Reset chat khi đóng/mở modal
    if (!isOpen) {
      setMessages([]);
      setInput("");
    }
  };

  // Mock API response
  const fetchChatBotResponse = async (text) => {
    // Giả lập delay call API
    // await new Promise(resolve => setTimeout(resolve, 800));
    const fetchData=await chatWithAI(text);
    return fetchData.data
    

  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Thêm tin nhắn người dùng
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await fetchChatBotResponse(input);
      
      setMessages(prev => [
        ...prev,
        { 
          sender: "bot", 
          text: botResponse.response, 
          products: botResponse.productResponse 
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          sender: "bot", 
          text: "Đã xảy ra lỗi khi tìm kiếm sản phẩm. Vui lòng thử lại sau." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text) => {
    setInput(text);
    // Tự động submit nếu modal đang mở
    if (isOpen) {
      const mockEvent = { preventDefault: () => {} };
      handleSend(mockEvent);
    }
  };

  return (
    <>
      <button className="chat-button" onClick={handleToggleModal}>
        <span role="img" aria-label="chat"><CloudMoon/></span>
      </button>

      {isOpen && (
        <div className="chat-modal-overlay">
          <div className="chat-modal">
            <button className="chat-close" onClick={handleToggleModal}>×</button>

            <div className="chat-header">
              <div className="chat-avatar">DL</div>
              <div>
                <h2>Trợ lý thời trang</h2>
                <p className="chat-status">Đang trực tuyến</p>
              </div>
            </div>

            <div className="chat-body">
              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div className="chat-welcome-message">
                    <p>Xin chào! Tôi có thể giúp gì cho bạn hôm nay?</p>
                    <p>Hãy thử một trong các gợi ý bên dưới hoặc nhập yêu cầu của bạn.</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.sender}`}>
                      <p>{msg.text}</p>
                      {msg.products && (
                        <div className="product-list">
                          {msg.products.map((p, i) => (
                            <div className="product-card" key={i}>
                              <img 
                                src={ p.displayProductResponse.ownerImage} 
                                alt={p.displayProductResponse.nameProduct} 
                              />
                              <p className="product-name">{p.displayProductResponse.nameProduct}</p>
                              <p className="product-price">
                                {p.displayProductResponse.price.toLocaleString()}₫
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="chat-message bot">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input-area" onSubmit={handleSend}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tôi đang tìm kiếm..."
                  className="chat-search"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi'}
                </button>
              </form>
              <p className="chat-note">
                Bằng cách sử dụng trợ lý ảo, bạn đồng ý với chính sách bảo mật của chúng tôi...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;