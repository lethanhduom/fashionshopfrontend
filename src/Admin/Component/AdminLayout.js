import { Box } from "@mui/material";
import Sidebar from "../Component/Sidebar";
import backgroundImage from "../../Image/admin_background.png"
const drawerWidth = 240; // Độ rộng của Sidebar

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FCE4EC", 
     border: "1px solid rgba(0, 0, 0, 0.2)", // Border xung quanh
     borderRadius: "20px", // Bo góc
     }}>
   
      {/* Sidebar */}
      <Box sx={{
        //  marginLeft: "20px" ,
       
      }}>
          <Sidebar />
        </Box>
      {/* Nội dung chính - Cách Sidebar một khoảng bằng drawerWidth */}
      <Box
        sx={{
          flexGrow: 1,
        //   marginLeft: `${drawerWidth}px`, // Để không bị Sidebar che mất
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
        
        
        }}
      >
        <Box
          sx={{
            width: "93%", // Chiều rộng của trang
            height: "85vh", // Chiều cao phù hợp
            bgcolor: "white", // Nền trắng
            borderRadius: "20px", // Bo góc
            boxShadow: 3, // Hiệu ứng đổ bóng
            padding: 3,
            overflow: "auto", // Thêm scroll khi nội dung dài
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
