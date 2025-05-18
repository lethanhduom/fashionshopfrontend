import React, { useEffect, useState } from "react";
import AdminLayout from "../Component/AdminLayout";
import SearchBar from "../Component/searchbar";
import { Button, Dialog, DialogContent, DialogTitle, Input, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createSize, getListDisplaySize } from "../../Service/SizeService";
import { DataGrid } from "@mui/x-data-grid";
import Swal from 'sweetalert2';
const Size=()=>{
    const [size,setSize]=useState([]);
    const [change,setChange]=useState();
    const [page,setPage]=useState();
    const [totalPages,setTotalPages]=useState();
    const [totalElements,setTotalElements]=useState();
    const paginationModel = { page: 0, pageSize: 10 };
    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const handleCreate = async() => {
        if (name.trim()) {
           
           
          Swal.fire({
                    title: 'Are you sure create new size?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'Cancel'
                    }).then(async (result) => { // Thêm async vào hàm callback
                        if (result.isConfirmed) {
                            const sizeCreate={
                                "id_size":0,
                                "nameSize":name,
                                "isDelete":0
                            };
                        try {
                           
                            
                            const response = await createSize(sizeCreate)
                            console.log(response)
                        
                        if (response.status === 200||response.status===201) {
                          Swal.fire(
                            'Create Successful!',
                            'Data has been created',
                            'success'
                          );
                          setChange((prev)=>(prev+1))
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'ERROR!',
                            text: 'Please try again',
                          });
                        }
                      } catch (error) {
                        console.error('Lỗi:', error);
                        Swal.fire({
                          icon: 'error',
                          title: 'ERROR',
                          text: 'CAN NOT CREATE NEW SIZE',
                        });
                      }
                    }
                  });


            setIsOpen(false); // Đóng modal sau khi tạo
        } else {
            alert('Name cannot be empty');
        }
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    useEffect (()=>{
        const rowData=async()=>{
            const result=await getListDisplaySize(page);
            setSize(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
        }
        console.log(size)
        rowData();
      },[change])
     const columns = [
            { field: 'stt', headerName: 'Stt', width: 70,
            },
            { field: 'nameSize', headerName: 'Size Name', width: 200 },
           
            {
              field: 'Update',
              headerName: 'Update',
              sortable:false,
              width: 140,
            
              renderCell:(params)=>(
                params.row.id_size!==null?(
                    <Button  sx={{ ml: 'auto',display:'flex' }} variant="outlined" color="infor"  >
                    UPDATE
                </Button>
                ):(
                    <Button sx={{ ml: 'auto',display:'flex' }} variant="outlined" color="infor" >
                    NULL
                </Button>  
                )
             )
                  
              
            },
            {
              field: 'Delete',
              headerName: 'Delete',
              sortable: false,
              width: 160,
             renderCell:(params)=>(
                params.row.isDelete===0?(
                    <Button sx={{ ml: 'auto',display:'flex' }} variant="outlined" color="error" >
                    BLOCK
                </Button>
                ):(
                    <Button sx={{ ml: 'auto',display:'flex' }} variant="outlined" color="error" >
                    UNBLOCK
                </Button>  
                )
             )
            },
          ];
          const rowsWithStt = size.map((row, index) => ({
            ...row,
            stt: index + 1, // Đếm từ 1
          }));
     
          
    return(
        <AdminLayout>
        <SearchBar/>
        <Button onClick={()=>toggleModal()} sx={{ ml: 'auto',display:'flex' }} variant="contained" color="success"   endIcon={<Add />}>
    ADD
</Button>
<Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsWithStt}
        columns={columns}
        getRowId={(row) => row.id_size}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
      </Paper>
      {isOpen && (
                <Dialog onClose={toggleModal} open={isOpen}>
                    <DialogContent style={{ padding: '20px', maxWidth: '400px' }}>
                    
                            <DialogTitle>Create Size</DialogTitle>
                     
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                            <Input id="name" placeholder="Enter size name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                   
                            <Button variant="outline" onClick={handleCreate}>Submit</Button>
                            <Button variant="outline" onClick={toggleModal}>Cancel</Button>
                       
                    </DialogContent>
                </Dialog>
            )}

</AdminLayout>
    );
};
export default Size;