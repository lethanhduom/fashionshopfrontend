import React, { useState } from 'react';
import { Modal, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateProductModal = ({ open, onClose, categories,sizes,colors, onSubmit }) => {
  const [product, setProduct] = useState({
    nameProduct: '',
    description: '',
    price: 0,
    createTime: new Date().toISOString(),
    rate: 0,
    isDelete: 0,
    id_category: '',
    details: [],
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDetailChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedDetails = [...product.details];
    
    if (name === "image" && files.length > 0) {
        updatedDetails[index][name] = files[0];  // Lưu đối tượng file thực tế
    } else {
        updatedDetails[index][name] = value;
    }
    
    setProduct((prevProduct) => ({
      ...prevProduct,
      details: updatedDetails,
    }));
};

  const handleAddDetail = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      details: [
        ...prevProduct.details,
        { stock: 0, price: 0, isDelete: 0, id_color: '', id_size: '', image: null },
      ],
    }));
  };

  const handleSubmit = () => {
    onSubmit(product);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={styles.modalContent}>
        <h2>Create Product</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="nameProduct"
              value={product.nameProduct}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="id_category"
                value={product.id_category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id_category} value={category.id_category}>
                    {category.nameCategory}-{category.productFor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} >
            <h3>Product Details</h3>
            {product.details.map((detail, index) => (
              <div key={index}>
                <TextField
                  label="Stock"
                  name="stock"
                  type="number"
                  value={detail.stock}
                  onChange={(e) => handleDetailChange(e, index)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={detail.price}
                  onChange={(e) => handleDetailChange(e, index)}
                  sx={{ marginBottom: 2 }}
                />
                <FormControl sx={{ marginBottom: 4 }}>
                  <InputLabel>Color</InputLabel>
                  <Select
                    name="id_color"
                    value={detail.id_color}
                    onChange={(e) => handleDetailChange(e, index)}
                    fullWidth
                  >
                  
                  {colors.map((color) => (
                    color.isDelete === 0 && (
                      <MenuItem key={color.id_color} value={color.id_color}>
                        {color.nameColor}-{color.codeColor}
                      </MenuItem>
                    )
                ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    name="id_size"
                    value={detail.id_size}
                    onChange={(e) => handleDetailChange(e, index)}
                  >
                    {/* Add size options here */}
                    {sizes.map((size) => (
                      size.isDelete===0&&(
                  <MenuItem key={size.id_size} value={size.id_size}>
                    {size.nameSize}
                  </MenuItem>
                      )
                ))}
                  </Select>
             
                </FormControl>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleDetailChange(e, index)}
                />
                <br />
              </div>
            ))}
            <IconButton onClick={handleAddDetail}>
              <AddIcon /> Add Detail
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Product
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

// CSS-in-JS for styling
const styles = {
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    width: '60%',
    maxHeight: '80%',
    overflowY: 'auto',  // Cho phép cuộn nếu nội dung dài
    borderRadius: '8px',  // Thêm góc bo tròn cho modal
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',  // Thêm hiệu ứng bóng đổ
  }
};

export default CreateProductModal;
