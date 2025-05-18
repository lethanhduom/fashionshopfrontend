import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import { getDetailOrder } from "../../Service/OrderService";

const OrderDetailModal = ({ open, onClose, orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchData=async()=>{
        if (open && orderId) {
        const res=    await getDetailOrder(orderId);
setOrder(res.data)

           }
    }
    fetchData();
   
  }, [open, orderId]);

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Detail Purchase #{orderId}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><strong>Reciepient Name:</strong> {order.recipientName}</Typography>
            <Typography><strong>Phone Number:</strong> {order.phoneNumber}</Typography>
            <Typography><strong>Address:</strong> {order.address}</Typography>
            <Typography><strong>Payment Method:</strong> {order.paymentMethod}</Typography>
            <Typography><strong>Product Discount Codes :</strong> {order.couponProduct || "Không có"}</Typography>
            <Typography><strong>Shipping Discount Codes</strong> {order.couponShippping || "Không có"}</Typography>
            {(order.status === 5 || order.status === 6) && (
                    <>
                      <Typography>
                        <strong>Reason:</strong> {order.reason || "Không có"}
                      </Typography>
                      <Typography>
                        <strong>Description Reason :</strong> {order.descriptionReason || "Không có"}
                      </Typography>
                    </>
                    )}

          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Total Price:</strong> {order.totalPriceProduct.toLocaleString()}đ</Typography>
            <Typography><strong>Ship Fee:</strong> {order.shipFee.toLocaleString()}đ</Typography>
            <Typography><strong>Ship Discount:</strong> {order.shipFeeCoupon.toLocaleString()}đ</Typography>
            <Typography><strong>Product Discount:</strong> {order.productFeeCoupon?.toLocaleString() || 0}đ</Typography>
            <Typography><strong>Final Total:</strong> {order.totalPriceCoupon.toLocaleString()}đ</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, overflowY: 'auto' }} />
        <Typography variant="h6">Sản phẩm:</Typography>
        {order.detailOrders.map((item, idx) => (
          <Box key={idx} display="flex" alignItems="center" mt={1} gap={2}>
            <Avatar src={item.image_url} variant="rounded" sx={{ width: 64, height: 64 }} />
            <Box>
              <Typography><strong>{item.nameProduct}</strong></Typography>
              <Typography>Size: {item.size}, Color: <span style={{ backgroundColor: item.color, padding: '0 10px' }}>&nbsp;</span></Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: {(item.price).toLocaleString()}đ x {(item.quantity)} = {(item.quantity*item.price)}đ</Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
