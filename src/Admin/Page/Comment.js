
import AdminLayout from "../Component/AdminLayout"
import EmotionSummary from "../Component/EmotionSummary";
import { Tab, Tabs,Box } from "@mui/material";
import EmotionByProduct from "../Component/EmotionByProduct";
import { useState } from "react";
import NegativeCommentAlert from "../Component/NegativeCommentAlert";
import CommentDetail from "../Component/CommentDetail";

const Comment=()=>{
      const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
    return (
        <AdminLayout>
           <Box sx={{ width: "100%" }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="comment tabs">
          <Tab label="Tổng quan cảm xúc" />
          <Tab label="Cảm xúc theo sản phẩm" />
          <Tab label="Chi tiết bình luận" />
          <Tab label="Cảnh báo tiêu cực" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tabIndex === 0 && <EmotionSummary />}
          {tabIndex === 1 && <EmotionByProduct />}
          {tabIndex === 2 && <CommentDetail />}
          {tabIndex === 3 && <NegativeCommentAlert />}
        </Box>
      </Box>
        </AdminLayout>
    )
}
export default Comment;