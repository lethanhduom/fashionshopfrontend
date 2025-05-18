// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Dashboard,
  Assignment,
  BarChart,
  Message,
  Help,
  Palette,


} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Logo from "../../Image/logo_admin.png";
import { Folder } from "lucide-react";
import { NotepadTextDashed } from 'lucide-react';
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "" },
  { text: "Account", icon: <PersonIcon />, path: "/admin/account" },
  { text: "Category", icon: <Folder />, path: "/admin/category" },
  { text: "Color", icon: <Palette />, path: "/admin/color" },
  { text: "Product", icon: <Assignment />, path: "/admin/product" },
  { text: "Orders", icon: <ReceiptIcon />, path: "/admin/order" },
  { text: "Coupon", icon: <PostAddIcon />, path: "/admin/coupon" },
  { text: "Messages", icon: <Message />, path: "/admin/chat" },
  { text: "Stats", icon: <BarChart />, path: "/admin/stats" },
  { text: "Comment", icon: <NotepadTextDashed/>, path: "/admin/comment" },
  { text: "Log out", icon: <LogoutIcon />, path: "/admin/login" },
];

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "#FCE4EC"
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            onClick={() => {
      setSelected(item.path);

      if (item.text === "Log out") {
        localStorage.removeItem("admin"); 
      }
    }}
            sx={{
              bgcolor: selected === item.path ? "#FFCDD2" : "transparent",
              "&:hover": { bgcolor: "#FFCDD2" }
            }}
          >
            <ListItemIcon
              sx={{
                color: selected === item.path
                  ? "#D32F2F"
                  : "rgba(0, 0, 0, 0.54)"
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                span: {
                  color: selected === item.path
                    ? "#D32F2F"
                    : "rgba(0, 0, 0, 0.87)"
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
