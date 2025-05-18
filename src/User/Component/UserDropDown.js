import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaUser, FaBox, FaQuestionCircle, FaRegCommentDots } from 'react-icons/fa';
import '../Css/UserDropDown.css'; // Import file CSS
import LoginModal from '../Page/Login';

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [userName, setUserName] = useState(''); // Lưu tên người dùng sau khi đăng nhập
  const dropdownRef = useRef(null);

  // Giả lập dữ liệu đăng nhập từ LocalStorage hoặc API
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.sub) {
      setIsLoggedIn(true);
      setUserName(user.sub);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('user', JSON.stringify({ name }));
    closeModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('user');
    setIsOpen(false);
  };

  const menuItems = [
    { icon: <FaUser />, text: 'My Account', href: '/user-account' },
    { icon: <FaBox />, text: 'My Orders', href: '/history-purchase' },
    { icon: <FaQuestionCircle />, text: 'Returns Information', href: '/returns' },
    { icon: <FaRegCommentDots />, text: 'Contact Preferences', href: '/contact' },
  ];

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="user-icon">
        <FaUser />
      </button>

      {isOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <div className="dropdown-arrow"></div>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <FaTimes />
          </button>

          {/* Nếu chưa đăng nhập */}
          {!isLoggedIn ? (
            <div className="sign-in">
              <a onClick={openModal}>Sign In</a> | <a href="/sign-up">Sign-up</a>
            </div>
          ) : (
            // Nếu đã đăng nhập
            <div className="user-info">
              <p>Welcome, <strong>{userName}</strong></p>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href}>
                      {item.icon} {item.text}
                    </a>
                  </li>
                ))}
              </ul>
              <button onClick={handleLogout} className="logout-btn">Log Out</button>
            </div>
          )}
        </div>
      )}

      {/* Modal Đăng Nhập */}
      <LoginModal isOpen={isModalOpen} closeModal={closeModal} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default UserDropdown;
