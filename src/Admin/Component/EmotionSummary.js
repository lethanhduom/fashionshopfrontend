import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { getEmotionSummary } from "../../Service/CommentService";
import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
} from "recharts";

const EmotionSummary = () => {
  const [chartData, setChartData] = useState([]);

  const COLORS = [ "#4caf50","#f44336", "#ff9800"]; // đỏ, xanh lá, cam

  useEffect(() => {
    const fetchData = async () => {
      let res = await getEmotionSummary();
      if (res.status === 200) {
        const formatted = res.data.map(([emotion, count]) => ({
          name: getLabel(emotion),
          value: count,
        }));
        setChartData(formatted);
      }
    };
    fetchData();
  }, []);

  const getLabel = (emotion) => {
    switch (emotion) {
      case 0: return "Tiêu cực";
      case 1: return "Tích cực";
      case 2: return "Trung lập";
      default: return "Không xác định";
    }
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h5" gutterBottom>
        Tổng quan cảm xúc bình luận
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={130}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EmotionSummary;
