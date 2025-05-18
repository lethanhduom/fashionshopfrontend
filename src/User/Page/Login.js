import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaTimes } from 'react-icons/fa';
import '../Css/Login.css';
import { signin } from '../../Service/AuthenService';
import { jwtDecode } from "jwt-decode"; 
import Swal from 'sweetalert2';
const LoginModal = ({ isOpen, closeModal }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user={
        "username":userName,
        "password":password
    }
   const response=await signin(user); 
  if(response.data.error==null){
    const decodeToken=jwtDecode(response.data.token);
    console.log(decodeToken)
    localStorage.setItem("user", JSON.stringify(decodeToken));
      Swal.fire(
                      'Login',
                      'Login Successful',
                      'success'
                    );
    window.location.reload()
   }else{
    Swal.fire({
                      icon: 'error',
                      title: "Login Failed",
                      text: response.data.error,
                    });
   }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={closeModal}>
          <FaTimes />
        </button>
        <h2>Đăng Nhập</h2>
        
        <div className="social-login">
          <button className="btn-social google">
            <FaGoogle /> Đăng nhập với Google
          </button>
          <button className="btn-social facebook">
            <FaFacebookF /> Đăng nhập với Facebook
          </button>
        </div>

        <div className="divider">Hoặc</div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
