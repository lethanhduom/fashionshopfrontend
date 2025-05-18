import React, { useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import "../Css/SignUp.css";
import Vertification from "../Component/Vertification";
import { sign_up } from "../../Service/AuthenService";
import Swal from 'sweetalert2';
import CitySelector from "../Component/CitySelector"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    address: "" 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleCitySelect = (selectedCity) => {
    setFormData((prev) => ({ ...prev, address: selectedCity }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Đang xử lý đăng ký...',
      text: 'Vui lòng chờ trong giây lát',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await sign_up(formData);
      if (response.status === 201) {
        localStorage.setItem("user-sign-up", formData.username);

        Swal.close();
        handleOpenModal(); // mở modal xác thực
      } else {
        Swal.fire({
          title: 'Đăng ký thất bại',
          icon: 'error',
          text: response.data || "Vui lòng thử lại",
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: 'Có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* 👇 Thêm chọn địa chỉ */}
          <CitySelector selectedCity={formData.address} onSelect={handleCitySelect} />

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <div className="social-signup">
          <p>Or Sign-up by</p>
          <div className="social-buttons">
            <button className="google-btn">
              <FaGoogle /> Google
            </button>
            <button className="facebook-btn">
              <FaFacebookF /> Facebook
            </button>
          </div>
        </div>

        <p className="login-link">
          Have you had account? <a href="/">Login</a>
        </p>
      </div>

      <Vertification isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SignUp;
