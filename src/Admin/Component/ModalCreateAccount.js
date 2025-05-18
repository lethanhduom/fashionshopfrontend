import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from "@mui/material";
import CitySelector from "../../User/Component/CitySelector";

const ModalCreateAccount = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (selected) => {
    setFormData({ ...formData, address: selected });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      address: ""
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Tạo tài khoản mới</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <div>
            <label style={{ marginBottom: "4px", display: "block" }}>
              Địa chỉ (Tỉnh/Thành phố)
            </label>
            <CitySelector
              selectedCity={formData.address}
              onSelect={handleAddressSelect}
            />
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Tạo tài khoản
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateAccount;
