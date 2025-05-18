import React, { useEffect, useState } from "react";
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

const EditAccountModal = ({ open, onClose, accountData, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    id:""
  });

  useEffect(() => {
    if (accountData) {
      setFormData({
  
        username: accountData.username || "",
        name: accountData.fullname || "",
        email: accountData.email || "",
        phone: accountData.phone || "",
        address: accountData.address || "",
        id:accountData.id_user||""
      });
    }
  }, [accountData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (selected) => {
    setFormData({ ...formData, address: selected });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            fullWidth
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
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
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccountModal;
