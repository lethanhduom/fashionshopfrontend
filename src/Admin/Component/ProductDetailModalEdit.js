import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Button,
    Grid,
    Box,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { SketchPicker } from 'react-color';
import { updateDetailProduct } from '../../Service/ProductService';
import Swal from 'sweetalert2';
  
  const EditProductDetailModal = ({ open, onClose, detail, colors, sizes, onUpdated }) => {
    const [form, setForm] = useState({});
    const [previewImage, setPreviewImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
    useEffect(() => {
      if (detail) {
        setForm({ ...detail });
        setPreviewImage(detail.image_url || '');
      }
    }, [detail]);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    };
  
    const handleSave = async () => {
      const formData = new FormData();
      formData.append('id_product_detail', form.id_product_detail);
      formData.append('stock', form.stock);
      formData.append('id_size', form.id_size);
      formData.append('id_color', form.id_color);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }else{
        formData.append('image',null);
      }
      try {
        // 👉 Hiển thị Swal loading
        Swal.fire({
          title: 'Updating...',
          text: 'Please wait a moment',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        onClose(); 
        const response = await updateDetailProduct(formData);
    
        if (response.status === 200) {
          Swal.close(); // 
    
          onUpdated();
          Swal.fire('Successful', 'Data has been updated.', 'success');
       
        }
      } catch (err) {
        Swal.close(); 
        console.error('Lỗi khi update detail:', err);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product Detail</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Box textAlign="center">
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 200, borderRadius: 8, marginBottom: 10 }}
                />
                <input type="file" onChange={handleImageChange} />
              </Box>
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Size"
                name="id_size"
                value={form.id_size || ''}
                onChange={handleChange}
              >
                {sizes.map((s) => (
                  <MenuItem key={s.id_size} value={s.id_size}>
                    {s.nameSize}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Color"
                name="id_color"
                value={form.id_color || ''}
                onChange={handleChange}
              >
                {colors.map((c) => (
                  <MenuItem key={c.id_color} value={c.id_color}>
                    <Box
                      display="inline-block"
                      width={16}
                      height={16}
                      mr={1}
                      style={{ backgroundColor: c.code, borderRadius: '50%' }}
                    />
                    {c.nameColor}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                value={form.stock || ''}
                onChange={handleChange}
                type="number"
              />
            </Grid>
  
            <Grid item xs={12} textAlign="right">
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditProductDetailModal;
  