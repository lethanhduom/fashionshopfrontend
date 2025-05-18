import React, { useEffect, useState } from "react";
import AdminLayout from "../Component/AdminLayout";
import SearchBar from "../Component/searchbar";
import Swal from 'sweetalert2';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Edit, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { actionCategory, createCategory, getCategory, getPageCategory, updateCategory } from "../../Service/CategoryService";
import CreateCategoryModal from "../Component/CreateCategoryModal";
import EditCategoryModal from "../Component/EditCategoryModal";

const Category = () => {
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [change, setChange] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");


  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState({});

  const handleClickUpdate=async(id)=>{
    const response=await getCategory(id);
    setCategory(response.data);
    setOpenModal(true);
  }

  const handleSave = async (updatedData) => {
    const formData=new FormData();
    formData.append("id",updatedData.id_category);
    formData.append("nameCategory",updatedData.nameCategory);
    formData.append("productFor",updatedData.productFor);
    if (updatedData.imageFile instanceof File) {
      formData.append("image", updatedData.imageFile);
    }
    setCategory(updatedData);
    const res=  await updateCategory(formData);
    Swal.fire({
      title: 'Đang tạo danh mục...',
      html: 'Vui lòng chờ...',  // Thêm thông tin cho người dùng
      didOpen: () => {
        Swal.showLoading();  // Hiển thị biểu tượng loading
      },
      allowOutsideClick: false,  // Không cho phép đóng ngoài click
      showConfirmButton: false,  // Không hiển thị nút xác nhận
    });
    
    try {
      const res = await updateCategory(formData);
    
      if (res.status === 200) {
        // Đóng loading sau khi thành công
        Swal.close();
        Swal.fire({
          title: "Update Successful!",
          icon: "success",
          draggable: true,
        });
    
        setChange(() => change + 1); 
    }
  }catch(error){
    console.error(error);
  }
  
  };


  useEffect(() => {
    const loadData = async () => {
      const response = await getPageCategory(page, rowsPerPage,searchKeyword);
      setPageData(response.data);
    };
    loadData();
  }, [page, rowsPerPage, change, searchKeyword]);
  const handleCreateCategory = async (newCategory) => {
    // Hiển thị thông báo loading
    Swal.fire({
      title: 'Đang tạo danh mục...',
      html: 'Vui lòng chờ...',
      didOpen: () => {
        Swal.showLoading();  // Hiển thị biểu tượng loading
      },
      allowOutsideClick: false,  // Không cho phép đóng ngoài click
    });
  
    try {
      const response = await createCategory(newCategory);
  
      if (response.status === 200 || response.status === 201) {

        Swal.close();  
        Swal.fire({
          title: "Thành công!",
          icon: "success",
          draggable: true,
        });
        setChange(()=>change+1)
      }
    } catch (error) {
   
      Swal.close();  
      Swal.fire({
        title: "Có lỗi xảy ra!",
        text: error.message,
        icon: "error",
        draggable: true,
      });
    }
  };
  
   const handleActionCategory=async(id,isDelete)=>{
      try{
        const response=await actionCategory(id);
        if(response.status===200){
          if(isDelete===0){
            Swal.fire('Success!', 'Category has been blocked', 'success');
          
          }else{
            Swal.fire('Success!', 'Category has been unblocked', 'success');
          }
          setChange(()=>change+1)
        
        }else{
  
          Swal.fire('Error', 'Something went wrong!', 'error');
         
        }
      }catch(err){
  
      }
    }
    const handleSearch = (query) => {
      setSearchKeyword(query);
      setPage(0); // reset về trang đầu khi tìm kiếm
    };

  return (
    <AdminLayout>
      <SearchBar  onSearch={handleSearch}/>
      <Button
      onClick={()=>setOpenCreateModal(true)}
        sx={{ ml: "auto", display: "flex", mr: 2, mt: 1 }}
        variant="contained"
        color="success"
        endIcon={<Add />}
      >
        ADD
      </Button>

      <Card sx={{ mt: 2, mx: 2, borderRadius: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Category For</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(pageData?.content) &&
                pageData.content.map((category) => (
                  <TableRow key={category.id_category}>
                    <TableCell>
                      <img
                        src={category?.imageUrl}
                        alt="Category"
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                        onError={(e) => (e.target.src = "/default.png")}
                      />
                    </TableCell>
                    <TableCell>{category.nameCategory}</TableCell>
                    <TableCell>{category.productFor}</TableCell>
               
                    <TableCell>{category?.createTime}</TableCell>
                    <TableCell>
                      {category.isDelete === 0 ? "Using" : "Blocking"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={()=>handleClickUpdate(category.id_category)} color="primary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        {category.isDelete === 0 ? (
                          <LockKeyhole onClick={()=>handleActionCategory(category.id_category,category.isDelete)} />
                        ) : (
                          <LockKeyholeOpen onClick={()=>handleActionCategory(category.id_category,category.isDelete)} />
                        )}
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
      <CreateCategoryModal
  open={openCreateModal}
  handleClose={() => setOpenCreateModal(false)}
  onCreate={handleCreateCategory}
/>;
<EditCategoryModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        categoryData={category}
        onSave={handleSave}
      />
    </AdminLayout>
  );
};

export default Category;
