import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";
import { getNegativeAlertProducts } from "../../Service/CommentService";
import { TriangleAlert } from "lucide-react";
const NegativeCommentAlert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await getNegativeAlertProducts(1);
      if (res.status === 200) {
        setAlerts(res.data);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
       <TriangleAlert/>  Cảnh báo sản phẩm có nhiều bình luận tiêu cực
      </Typography>
      {alerts.length === 0 ? (
        <Typography>Không có sản phẩm nào bị cảnh báo.</Typography>
      ) : (
        alerts.map((item, index) => (
          <Alert key={index} severity="warning" sx={{ mb: 1 }}>
            <AlertTitle>{item.productName}</AlertTitle>
            Có <strong>{item.negativeCount}</strong> bình luận tiêu cực
          </Alert>
        ))
      )}
    </Box>
  );
};

export default NegativeCommentAlert;
