import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, Button, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import EditProductDetailModal from './ProductDetailModalEdit';
import { updateProduct } from '../../Service/ProductService';
import Swal from 'sweetalert2';
const EditProductModal = ({ open, onClose, product, categories, colors, sizes, onUpdated }) => {
  const [form, setForm] = useState({});
  const [openEditDetail, setOpenEditDetail] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    if (product) setForm({ ...product });
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
   
    // const response = await updateProductBasicInfo(form); // bạn viết API updateProductBasicInfo
    // if (response.status === 200) {
    //   onUpdated();
    //   onClose();
    // }
    const data={
        "id_product":form.id_product,
        "nameProduct":form.nameProduct,
        "description":form.description,
        "price":form.price,
        "id_category":form.id_category
    }
    const response=await updateProduct(data);
    if(response.status===200){
        onUpdated();
         Swal.fire(
                                'Successful',
                                'Data has been updated.',
                                'success'
                              );
        onClose();
    }
    
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField fullWidth label="Product Name" name="nameProduct" value={form.nameProduct || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Price" name="price" value={form.price || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Rate" name="rate" value={form.rate || ''} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="id_category"
                value={form.id_category || ''}
                onChange={handleChange}
              >
                {categories.map((cate) => (
                  <MenuItem key={cate.id_category} value={cate.id_category}>{cate.nameCategory}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Grid container spacing={2}>
              {form.productDetailResponses?.map((detail) => (
                <Grid item xs={3} key={detail.id_product_detail}>
                  <img
                    src={detail.image_url}
                    alt="detail"
                    style={{ width: '100%', cursor: 'pointer', borderRadius: 8 }}
                    onClick={() => {
                      setSelectedDetail(detail);
                      setOpenEditDetail(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mt={3} textAlign="right">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>Save</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <EditProductDetailModal
                open={openEditDetail}
                onClose={() => {
            setOpenEditDetail(false);       
            onClose();                      
        }}
        detail={selectedDetail}
        colors={colors}
        sizes={sizes}
        onUpdated={() => onUpdated()}
      />
    </>
  );
};

export default EditProductModal;
