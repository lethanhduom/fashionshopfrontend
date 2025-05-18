import { useEffect, useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Tab, Tabs, Table,
  TableBody, TableCell, TableHead, TableRow, Typography,
  TablePagination, IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import { Edit, Delete, Add } from "@mui/icons-material";
import AdminLayout from "../Component/AdminLayout";
import Sidebar from "../Component/Sidebar";
import SearchBar from "../Component/searchbar";
import { createCoupon, getDetailCoupon, getPageCoupon } from "../../Service/CouponService";
import CreateCouponModal from "../Component/CreateCouponModal";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import UpdateCouponModal from "../Component/UpdateCouponModal";
const Coupon = () => {
  const [tabIndex, setTabIndex] = useState(0); // 0: active, 1: inactive
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0, number: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [change,setChange]=useState(0);
  const loadCoupons = async () => {
    try {
      const isDelete = tabIndex === 1 ? 1 : 0;
      const res = await getPageCoupon( isDelete,page, rowsPerPage);
      setPageData(res.data);

    } catch (err) {
      console.error("Lỗi load coupons", err);
    }
  };
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isUpdateModalOpen,setIsUpdateModalOpen]=useState(false);
  const [selectedCoupon,setSelectendCoupon]=useState({});
  const handleUpdateCoupon= async(id)=>{
   setChange(()=>change+1)
   
  }
  const handleClickUpdate=async(id)=>{
   
    const response= await getDetailCoupon(id);
    setSelectendCoupon(response.data)
    setIsUpdateModalOpen(true);

  }
  const handleCreate = async(data) => {

  const res= await createCoupon(data);
  if(res.status===200||res.status===201){
    Swal.fire(
    'Success',
    'Create Coupon Successful',
    'success'
            )
    setChange(()=>change+1);
  }
  };
  useEffect(() => {
    loadCoupons();
  }, [page, rowsPerPage, tabIndex,change]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa coupon này?")) {
    //   await deleteCouponById(id);
      loadCoupons(); // reload sau khi xóa
    }
  };

  return (
    <AdminLayout>
      <Sidebar />
      <SearchBar />
          <Button onClick={()=>setOpenCreateModal(true)}  sx={{ ml: 'auto',display:'flex' ,mr:2,mt:1}} variant="contained" color="success"   endIcon={<Add />}>
          ADD
      </Button>
      <Card sx={{ mt: 2, mx: 2, borderRadius: 3 }}>
        <CardContent>
      

          <Tabs value={tabIndex} onChange={(e, v) => {
            setTabIndex(v);
            setPage(0); // reset về trang đầu khi đổi tab
          }}>
            <Tab label="Coupon is Active" />
            <Tab label="Coupon is Unactive" />
          </Tabs>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{maxWidth:'40px'}}>Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Decrease</TableCell>
                <TableCell>Minimum value </TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Category</TableCell>
               
                {tabIndex === 0 && <TableCell >Edit</TableCell>}
                {tabIndex === 0 && <TableCell  >Delete</TableCell>}
             <TableCell  >Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Array.isArray(pageData?.content) && pageData.content.map((coupon) => (
                <TableRow key={coupon.id_coupon}>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.typeCode === "percent" ? "Percent" : "Cash"}</TableCell>
                  <TableCell>{coupon.typeCode === "percent" ? `${coupon.decreasePercent}%` : `${coupon.decreaseCrash.toLocaleString()}đ`}</TableCell>
                  <TableCell>{coupon.minOrderValue.toLocaleString()}đ</TableCell>
                  <TableCell>{coupon.startDate} </TableCell>
                  <TableCell>{coupon.endDate} </TableCell>
                  <TableCell>{coupon.category}</TableCell>
                
                  {tabIndex === 0 && (
                    <TableCell>
                      <IconButton  color="primary" onClick={()=>handleClickUpdate(coupon.id_coupon)}><Edit /></IconButton>
                    
                    </TableCell>
                  )}
                  {tabIndex === 0 && (
                    <TableCell>
                    <IconButton color="error" onClick={() => handleDelete(coupon.id_coupon)}><Delete /></IconButton>
                   
                    </TableCell>
                  )}
               
                    <TableCell>
                    <IconButton color="secondary"><RemoveRedEyeIcon/></IconButton>
                    
                   
                    </TableCell>
             

                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={pageData.totalElements}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0); // reset page khi đổi rowsPerPage
            }}
            labelRowsPerPage="Số dòng mỗi trang"
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>
      <CreateCouponModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} onSubmit={handleCreate} />
      <UpdateCouponModal
  open={isUpdateModalOpen}
  onClose={() => setIsUpdateModalOpen(false)}
  onUpdate={handleUpdateCoupon}
  couponData={selectedCoupon}
/>
    </AdminLayout>
  );
};

export default Coupon;
