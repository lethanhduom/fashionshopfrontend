import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
};

const scrollContentStyle = {
  overflowY: "auto",
  maxHeight: "60vh",
  paddingRight: "4px",
};

const CreateCategoryModal = ({ open, handleClose, onCreate }) => {
  const [formData, setFormData] = useState({
    nameCategory: "",
    productFor: "",
    imageFile: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    const { nameCategory, productFor, imageFile } = formData;
    if (!nameCategory || !productFor || !imageFile) {
      return;
    }

    const data = new FormData();
    data.append("nameCategory", nameCategory);
    data.append("productFor", productFor);
    data.append("image", imageFile);
   

    onCreate(data);

    setFormData({
      nameCategory: "",
      productFor: "",
      imageFile: null,
      imagePreview: null,
    });

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Create New Category
        </Typography>

        {/* Nội dung scroll */}
        <Box sx={scrollContentStyle}>
          <Stack spacing={2}>
            <TextField
              label="Category Name"
              name="nameCategory"
              value={formData.nameCategory}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Category For"
              name="productFor"
              value={formData.productFor}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Man">Man</MenuItem>
              <MenuItem value="Woman">Woman</MenuItem>
            </TextField>
            <Button variant="outlined" component="label">
              Select Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                style={{ width: "100%", borderRadius: 8 }}
              />
            )}
          </Stack>
        </Box>

        {/* Nút tạo mới cố định */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Now
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateCategoryModal;
