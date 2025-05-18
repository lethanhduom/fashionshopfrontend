import React, { useState } from 'react';
import "../Css/AdminLogin.css"
import { FaUserShield } from 'react-icons/fa';
import { siginInAdmin } from '../../Service/AuthenService';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin={
        username,
        password
    }
    const response=await siginInAdmin(admin);
     if(response.data.error==null){
        const decodeToken=jwtDecode(response.data.token);
        console.log(decodeToken)
        localStorage.setItem("admin", JSON.stringify(decodeToken));
          Swal.fire(
                          'Login',
                          'Login Successful',
                          'success'
                        ).then(
                                navigate("/admin/")
                        )
       }else{
        Swal.fire({
                          icon: 'error',
                          title: "Login Failed",
                          text: response.data.error,
                        });
       }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="admin-icon">
          <FaUserShield size={50} />
        </div>
        <h2>Đăng nhập Admin</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
        
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default AdminLogin;
