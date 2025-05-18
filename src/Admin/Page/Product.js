import { Edit, LockKeyhole, LockKeyholeOpen, ScanEye } from "lucide-react";
import AdminLayout from "../Component/AdminLayout";
import Sidebar from "../Component/Sidebar";
import SearchBar from "../Component/searchbar";
import { useEffect, useState } from "react";
import { getListCategory } from "../../Service/CategoryService";
import { Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import CreateProductModal from "../Component/CreateProductModal";
import { Add } from '@mui/icons-material';
import { getListColor } from "../../Service/ColorService";
import { getListSize } from "../../Service/SizeService";
import { actionProduct, createProduct, displayProductAdmin, getDetailProduct } from "../../Service/ProductService";
import Swal from 'sweetalert2';
import ProductDetailModal from "../Component/ProductDetailModal";
import EditProductModal from "../Component/EditProductModal";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [change, setChange] = useState();
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
const [openDetailModal, setOpenDetailModal] = useState(false);
const [productDetail, setProductDetail] = useState(null);

const [openEditModal, setOpenEditModal] = useState(false);
const [productToEdit, setProductToEdit] = useState(null);

const handleOpenEdit = async (id_product) => {
  try {
    const response = await getDetailProduct(id_product);
    setProductToEdit(response.data);
    setOpenEditModal(true);
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm để edit", err);
  }
};

const handleSearch = (query) => {
  setSearchKeyword(query);
  setPage(0); // reset về trang đầu khi tìm kiếm
};



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateProduct = async (product) => {
    const formData = new FormData();

    const product_convert = {
      nameProduct: product.nameProduct,
      price: product.price,
      description: product.description,
      createTime: product.createTime,
      rate: 0,
      isDelete: 0,
      id_category: product.id_category,
      details: product.details.map(detail => ({
        stock: detail.stock,
        id_color: detail.id_color,
        id_size: detail.id_size
      }))
    };

    formData.append("product", JSON.stringify(product_convert));
    product.details.forEach(detail => {
      if (detail.image) {
        formData.append("images", detail.image);
      }
    });

    // Alert loading
    Swal.fire({
      title: 'Creating Product...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await createProduct(formData);
      Swal.close();

      if (response.status === 201) {
        Swal.fire('Successful', 'Product has been added.', 'success');
        setChange(Date.now()); // trigger reload
        handleClose();
      }
    } catch (error) {
      Swal.close();
      Swal.fire('Error', 'Something went wrong!', 'error');
      console.error("Lỗi", error);
    }
  };

  const handleOpenDetail = async (id_product) => {
    try {
      const response = await getDetailProduct(id_product); // gọi API
      setProductDetail(response.data);
      setOpenDetailModal(true);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết sản phẩm", err);
    }
  };
  
  const handleActionProduct=async(id,isDelete)=>{
    try{
      const response=await actionProduct(id);
      if(response.status===200){
        if(response.data==="success"){
          if(isDelete===0){
           
            Swal.fire('Success!', 'Product has been locked', 'success');
        
          }else if(isDelete===1){
     
          
            Swal.fire('Success!', 'Product has been unlocked', 'success');
       
          }
          setChange((prev)=>prev+1)
        
        }else{
  
          Swal.fire('Error', response.data, 'error');
         
        }
       
        }
       
    }catch(err){

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result1 = (await getListCategory(0)).data;
      const result2 = (await getListColor()).data;
      const result3 = (await getListSize()).data;
      const response = await displayProductAdmin(page, rowsPerPage,searchKeyword);
      setCategory(result1);
      setColor(result2);
      setSize(result3);
      setPageData(response.data);
    
    };

    fetchData();
  }, [page, rowsPerPage, change,searchKeyword]);

  return (
    <AdminLayout>
      <SearchBar  onSearch={handleSearch} />
      <Button onClick={handleOpen} sx={{ ml: 'auto', display: 'flex',mt:1 }} variant="contained" color="success" endIcon={<Add />}>
        ADD
      </Button>

      <Card sx={{ mt: 2, mx: 2, borderRadius: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
          
                <TableCell>Product Name</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Product For</TableCell>
               
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(pageData?.content) &&
                pageData.content.map((product) => (
                  <TableRow key={product.id_product}>
                    <TableCell>{product.nameProduct}</TableCell>
                    <TableCell>{product.nameCategory}</TableCell>
                    <TableCell>{product.productFor}</TableCell>

                    <TableCell>{product.isDelete === 0 ? "Using" : "Blocking"}</TableCell>
                   

                    <TableCell>
                      <IconButton onClick={()=>{
                        handleOpenDetail(product.id_product)
                      }} color="primary">
                        <ScanEye />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEdit(product.id_product)} color="primary">
                      
                        <Edit />
                      </IconButton>
                    </TableCell>
                    
                    <TableCell>
                      <IconButton onClick={()=>handleActionProduct(product.id_product,product.isDelete)}  color="primary">
                        
                        {product.isDelete === 0 ? <LockKeyhole /> : <LockKeyholeOpen   /> 
                        
                        }
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={pageData.totalElements || 0}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="Số dòng mỗi trang"
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      <CreateProductModal
        open={open}
        onClose={handleClose}
        categories={category}
        sizes={size}
        colors={color}
        onSubmit={handleCreateProduct}
      />
      <ProductDetailModal
  open={openDetailModal}
  onClose={() => setOpenDetailModal(false)}
  product={productDetail}
/>
<EditProductModal
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
  product={productToEdit}
  categories={category}
  colors={color}
  sizes={size}
  onUpdated={() => setChange(()=>change+1)}
/>
    </AdminLayout>
  );
};

export default Product;
