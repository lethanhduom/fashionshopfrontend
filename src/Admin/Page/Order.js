import React, { useEffect, useState } from "react";
import AdminLayout from "../Component/AdminLayout";
import SearchBar from "../Component/searchbar";
import { displayPageAdmin, updateStatusOrder } from "../../Service/OrderService";
import { Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { Add } from '@mui/icons-material';
import { Edit, LockKeyhole, LockKeyholeOpen, ScanEye, SquareX} from "lucide-react";
import OrderDetailModal from "../Component/OrderDetailModal";
import Swal from 'sweetalert2';
const Order=()=>{
     const [pageData, setPageData] = useState([]);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [change,setChange]=useState(0);
      const [openDetail, setOpenDetail] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleOpenDetail = (id) => {
    setSelectedOrderId(id);
    setOpenDetail(true);

    };
      useEffect(()=>{
        const fetchData=async()=>{
            const res=await displayPageAdmin(page,rowsPerPage);
            setPageData(res.data);
        }
        fetchData();
      },[page,rowsPerPage,change])
 const setUpdateButton=(method,status)=>{
    if(method==="COD"){
     return status===0?"Update To Shipped": status===2?"Update To Receive":"Update To Confirm";
    }else{
        return status===1?"Update To Shipped": status===2?"Update To Receive":"Update To Confirm";
    }

 }
  const handleUpdateStatus=async(id,status)=>{
    let statusUpdate;
      if(status===5){
        Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'This Order has been denied',
        });
        return;
      }else if(status===6){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'This Order has been returned',
            });
            return;
      }else{
        if (status===1||status===0){
         statusUpdate=2;
         const res=await updateStatusOrder(id,statusUpdate);
         if(res.status===200){
    
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'This Order has been Shipped',
              });
              setChange(()=>change+1);
            
         }
        }else{
          if(status<4){
            statusUpdate=status+1;
            let status_string=statusUpdate===3?"Received":"Completed";
            const response=await updateStatusOrder(id,statusUpdate);
            if(response.status===200){
              
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `This Order has been ${status_string}`,
            });
            setChange(()=>change+1);
           
            }
          }else{
            Swal.fire({
              icon: 'warning',
              title: 'Warning!',
              text: 'This Order has been Complete',
              });
              setChange(()=>change+1);
              
          }
        }
      }
  }
    return (
    <AdminLayout>
    <SearchBar/>

          <Card sx={{ mt: 2, mx: 2, borderRadius: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
          
           
                <TableCell>Recipient Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Method Payment</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(pageData?.content) &&
                pageData.content.map((order) => (
                  <TableRow key={order.id_order}>
                    <TableCell>{order.recipient_name}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.status===0?"Ordering":order.status===1?"Paiding":order.status===2?"Shipping":order.status===3?"Received":order.status===4?"Completed":order.status===5?"Canceled":"Returned"}</TableCell>
                    
                   

                    <TableCell>
                      <IconButton onClick={()=>handleOpenDetail(order.id_order)} color="primary">
                        <ScanEye />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                    <Button disabled={order.status===4} onClick={()=>handleUpdateStatus(order.id_order,order.status)} variant="outlined">{
                      setUpdateButton(order.paymentMethod,order.status)
                    }</Button>
                    </TableCell>
                    
                    <TableCell>
                      <IconButton color="error">
                        
                      <SquareX/>
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
      <OrderDetailModal 
  open={openDetail}
  onClose={() => setOpenDetail(false)}
  orderId={selectedOrderId}
/>

    </AdminLayout>)
}
export  default Order;