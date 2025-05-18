import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getEmotionProductSummary } from "../../Service/CommentService";


const EmotionByProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getEmotionProductSummary();
      if (res.status === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Biểu đồ cảm xúc theo sản phẩm</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="positive" stackId="a" fill="#4caf50" name="Tích cực" />
          <Bar dataKey="neutral" stackId="a" fill="#ffc107" name="Trung lập" />
          <Bar dataKey="negative" stackId="a" fill="#f44336" name="Tiêu cực" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EmotionByProduct;
