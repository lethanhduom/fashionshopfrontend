import { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent,
  Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const ProductDetailModal = ({ open, onClose, product }) => {
  const [colors, setColors] = useState({});
  const [sizes, setSizes] = useState({});

  useEffect(() => {
    const fetchExtraData = async () => {
      if (!product?.productDetailResponses) return;

      const colorPromises = product.productDetailResponses.map(detail =>
        axios.get(`http://localhost:8082/identity/api/color/get-color?id=${detail.id_color}`)
          .then(res => ({ id: detail.id_color, data: res.data }))
          .catch(() => ({ id: detail.id_color, data: null }))
      );

      const sizePromises = product.productDetailResponses.map(detail =>
        axios.get(`http://localhost:8082/identity/api/size/get-size?id=${detail.id_size}`)
          .then(res => ({ id: detail.id_size, data: res.data }))
          .catch(() => ({ id: detail.id_size, data: null }))
      );

      const colorResults = await Promise.all(colorPromises);
      const sizeResults = await Promise.all(sizePromises);

      const colorMap = {};
      const sizeMap = {};

      colorResults.forEach(({ id, data }) => {
        if (data) colorMap[id] = data;
      });

      sizeResults.forEach(({ id, data }) => {
        if (data) sizeMap[id] = data;
      });

      setColors(colorMap);
      setSizes(sizeMap);
    };

    if (open && product) {
      fetchExtraData();
    }
  }, [open, product]);

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Product Detail
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">{product.nameProduct}</Typography>
        <Typography variant="body1" color="text.secondary">
          Price: {product.price?.toLocaleString()} VND
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Rate: {product.rate}
        </Typography>

        {/* Image Gallery */}
        <Grid container spacing={2} sx={{ my: 2 }}>
          {product.images?.map((img, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <img
                src={img}
                alt={`product-${index}`}
                style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 10 }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Product Detail Table */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Product Variants
        </Typography>
        <Table size="small" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.productDetailResponses?.map((detail) => (
              <TableRow key={detail.id_product_detail}>
                <TableCell>
                  {sizes[detail.id_size]?.nameSize || detail.id_size}
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: colors[detail.id_color]?.codeColor
                          ? `${colors[detail.id_color].codeColor}`
                          : "#ccc",
                        border: "1px solid #ccc"
                      }}
                    />
                    <span>{colors[detail.id_color]?.nameColor || detail.id_color}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <img
                    src={detail.image_url}
                    alt="variant"
                    style={{ width: 50, height: 50, borderRadius: 5, objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell>{detail.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
