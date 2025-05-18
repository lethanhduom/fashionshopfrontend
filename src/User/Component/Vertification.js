import React, { useState } from "react";
import "../Css/Vertification.css"; 
import { active } from "../../Service/AuthenService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoginModal from "../Page/Login";
const Vertification = ({ isOpen, onClose }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async() => {

    alert(`Confirmation code: ${code.join("")}`);
    const username = localStorage.getItem('user-sign-up');
    const response=await active(username,code.join(""));
    // if(response.status===200&& response.data==="Active Successful"){
   
        Swal.fire({
          title: response.data,
          icon: "success",
          draggable: true
        });
    // }
    onClose();
    setIsModalOpen(true);
    navigate('/')
   
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Enter Your Confirmation Code</h3>
          <div className="input-container">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="input-field"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button onClick={handleSubmit} style={{ marginTop: "15px" }}>
            Submit
          </button>
        </div>
        <LoginModal isOpen={isModalOpen} closeModal={closeModal}  />
      </div>
    )
  );
};

export default Vertification;
