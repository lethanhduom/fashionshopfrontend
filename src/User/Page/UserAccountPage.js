import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CitySelector from "../Component/CitySelector";
import { changePassword, getInforUser, updateAccountByUser } from "../../Service/AuthenService";
import Swal from "sweetalert2";

const UserAccountPage = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [change, setChange] = useState(0);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = JSON.parse(localStorage.getItem("user"))?.sub;
        if (!username) throw new Error("No username found in localStorage");
        const res = await getInforUser(username);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        Swal.fire("Error", "Failed to load user information.", "error");
      }
    };
    fetchData();
  }, [change]);

  // Xử lý thay đổi input
  const handleUserChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Xử lý lưu thông tin người dùng
  const handleSave = async () => {
    try {
      if (!user.name || !user.phone || !user.address) {
        Swal.fire("Warning", "Please fill in all required fields.", "warning");
        return;
      }

      if (!/^[0-9]{10,11}$/.test(user.phone)) {
        Swal.fire("Warning", "Invalid phone number (10-11 digits required).", "warning");
        return;
      }

      // Tạo dữ liệu theo cấu trúc API yêu cầu
      const updateData = {
        id: user.id,
        name: user.name,
        phone: user.phone,
        address: user.address,
        username: user.username,
        email: user.email,
      };

      console.log("Data sent to API:", updateData); // Debug dữ liệu gửi đi
      const res = await updateAccountByUser(updateData);
      if (res.status === 200) {
        Swal.fire("Success", "User information updated successfully.", "success");
        setEditing(false);
        setChange((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to update user information.", "error");
    }
  };

  // Xử lý đổi mật khẩu
  const handlePasswordChange = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      Swal.fire("Warning", "Please fill in all password fields.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New password and confirmation do not match.", "error");
      return;
    }

    const data = {
      username: user.username,
      oldPassword,
      newPassword,
    };

    try {
      const res = await changePassword(data);
      if (res.status === 200) {
        Swal.fire("Success", "Password changed successfully.", "success");
        setShowPasswordForm(false);
        setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to change password.", "error");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, display: "flex", width: "90%", maxWidth: "1000px", borderRadius: 4 }}>
        {/* LEFT SIDE */}
        <Box width="35%" display="flex" flexDirection="column" alignItems="center" pr={4} borderRight="1px solid #ccc">
          <Avatar src={user.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h6">{user.name || "N/A"}</Typography>
          <Typography variant="body2" color="text.secondary">{user.email || "N/A"}</Typography>
          <Typography variant="body2" mt={1}>Phone: {user.phone || "N/A"}</Typography>
          <Typography variant="body2">Address: {user.address || "N/A"}</Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box width="65%" pl={4}>
          <Typography variant="h6" gutterBottom>Account Information</Typography>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={user.name || ""}
            onChange={handleUserChange}
            disabled={!editing}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={user.email || ""}
            disabled
            sx={{ mt: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            value={user.phone || ""}
            onChange={handleUserChange}
            disabled={!editing}
            sx={{ mt: 2 }}
          />

          {editing ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" mb={1}>Address</Typography>
              <CitySelector
                selectedCity={user.address}
                onSelect={(value) =>
                  setUser((prev) => ({
                    ...prev,
                    address: typeof value === "object" ? value.city : value,
                  }))
                }
              />
            </Box>
          ) : (
            <TextField
              label="Address"
              fullWidth
              value={user.address || ""}
              disabled
              sx={{ mt: 2 }}
            />
          )}

          {editing ? (
            <Box mt={2} display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Button sx={{ mt: 3 }} variant="contained" onClick={() => setEditing(true)}>
              Update Information
            </Button>
          )}

          <Divider sx={{ my: 3 }} />

          <Button variant="outlined" onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? "Close" : "Change Password"}
          </Button>

          {showPasswordForm && (
            <Box mt={2}>
              <TextField
                label="Old Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                sx={{ mt: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="New Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Confirm New Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handlePasswordChange}>
                Confirm Change Password
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAccountPage;