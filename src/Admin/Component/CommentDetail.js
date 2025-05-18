import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Annoyed,Angry,Smile ,Star  } from 'lucide-react';
import { getFilteredComments } from "../../Service/CommentService";

const CommentDetail = () => {
  const [comments, setComments] = useState([]);
  const [productId, setProductId] = useState(null);
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [productId, emotion]);

  const fetchComments = async () => {
    const res = await getFilteredComments(productId, emotion);
    if (res.status === 200) setComments(res.data);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Chi tiết bình luận</Typography>

      <Box display="flex" gap={2} mb={2}>
        <FormControl>
          <InputLabel>Cảm xúc</InputLabel>
          <Select
            value={emotion ?? ""}
            onChange={(e) =>
              setEmotion(e.target.value === "" ? null : parseInt(e.target.value))
            }
            style={{ width: 150 }}
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value={1}>Tích cực</MenuItem>
            <MenuItem value={0}>Tiêu cực</MenuItem>
            <MenuItem value={2}>Trung lập</MenuItem>
          </Select>
        </FormControl>

        {/* Có thể thêm lọc product nếu muốn */}
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Người dùng</TableCell>
                 <TableCell>Sản Phẩm</TableCell>
                 <TableCell>Loại Sản Phẩm</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Đánh giá</TableCell>
              <TableCell>Cảm xúc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((c, i) => (
              <TableRow key={i}>
                <TableCell>{c.username || "Ẩn danh"}</TableCell>
                <TableCell>{c.namProduct}</TableCell>
                 <TableCell>{c.color}-{c.size}</TableCell>
                <TableCell>{c.review}</TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell>{c.rate} <Star color="yellow"/></TableCell>
                <TableCell>
                   {c.emotion === 0 ? (
    <>
      <Angry size={18} color="red" style={{ marginRight: 4 }} />
      Tiêu cực
    </>
  ) : c.emotion === 1 ? (
    <>
      <Smile size={18} color="green" style={{ marginRight: 4 }} />
      Tích cực
    </>
  ) : (
    <>
      <Annoyed size={18} color="gray" style={{ marginRight: 4 }} />
      Trung lập
    </>
  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default CommentDetail;
