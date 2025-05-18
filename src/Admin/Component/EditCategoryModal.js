import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  overflowY:'auto',
  maxHeight:'80vh'
};

const EditCategoryModal = ({ open, handleClose, categoryData, onSave }) => {
  const [formData, setFormData] = useState({ ...categoryData });
  const [previewImage, setPreviewImage] = useState(categoryData.imageUrl);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setFormData({ ...categoryData });
    setPreviewImage(categoryData.imageUrl);
    setImageFile(null);
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };


  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      imageFile,
    
    };
    onSave(updatedData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Edit Category
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Name Category"
          name="nameCategory"
          value={formData.nameCategory}
          onChange={handleChange}
        />

       
        <FormControl  fullWidth margin="normal">
          <InputLabel id="isDelete-label">Category For</InputLabel>
          <Select
            labelId="isDelete-label"
            name="productFor"
            value={formData.productFor}
            onChange={handleChange}
            label="Product For"
          >
            <MenuItem value={"Woman"}>Woman</MenuItem>
            <MenuItem value={"Man"}>Man</MenuItem>
          </Select>
        </FormControl>

        

        <Box mt={2}>
          <Typography variant="body1">Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '8px' }}
          />
          {previewImage && (
            <Box mt={2}>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                width: '30%',
                maxHeight: '50px',
                objectFit: 'cover',
                borderRadius: '8px'
            }}
              />
            </Box>
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
  <Button variant="outlined" onClick={handleClose}>
    Cancel
  </Button>
  <Button
    variant="contained"
    onClick={handleSubmit}
    style={{ marginLeft: '12px' }}
  >
    Save
  </Button>
</Box>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
