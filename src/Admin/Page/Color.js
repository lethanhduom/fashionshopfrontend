import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AdminLayout from '../Component/AdminLayout';
import SearchBar from '../Component/searchbar';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { createColor, getListDisPlayColor, updateColor } from '../../Service/ColorService';
import { SketchPicker } from 'react-color';
import { Modal} from '@mui/material';
import Swal from 'sweetalert2';
import "../Css/Color.css"
import axios from 'axios';

const Color=() =>{

  const [pageSize, setPageSize] = useState(10);
    const [color,setColor]=useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, settotalElements] = useState(0);
    const [colorName, setColorName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [change,setChange]=useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openUpdate,setOpenUpdate]=useState(false);
    const handleOpenUpdate=()=>setOpenUpdate(true);
    const handleCloseUpdate=()=>setOpenUpdate(false);
    const [colorNameUpdate,setColorNameUpdate]=useState('');
    const [currentColorNameUpdate,setCurrentColorNameUpdate]=useState('');
    const [currentColorCodeUpdate,setCurrentColorCodeUpdate]=useState('');
    const [colorCodeUpdateSelect,setColorCodeUpdateSelect]=useState('');
    const [idColor,setIdColor]=useState();
    const [statusColor,setStatusColor]=useState();
    const handleSave = () => {
        if (colorName) {
           console.log(selectedColor,colorName)
            handleClose();
              Swal.fire({
                title: 'Are you sure ADD this color?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'YES',
                cancelButtonText: 'NO'
              }).then(async (result) => { // Thêm async vào hàm callback
                if (result.isConfirmed) {
                        const color=
                  {
                  
                      "nameColor": colorName,
                      "codeColor": selectedColor,
                      "isDelete": 0
                    }
                  try {
                    // Sử dụng await bên trong hàm async
                    const response = await createColor(color);
                    if (response.status === 200||response.status === 201) {
                      Swal.fire(
                        'Successful',
                        'Data has been ADDED.',
                        'success'
                      );
                      setChange((prev)=>(prev+1))
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Something went wrong, Please try again',
                      });
                    }
                  } catch (error) {
                    console.error('Lỗi:', error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error!',
                      text: 'Cannot ADD data.',
                    });
                  }
                }
                setChange((prev)=>(prev+1))
              });
            
              
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Color name is empty',
          });
        }

       
    };
    const handleBlock = async (id, name, code, status) => {
      if (status === 0) {
        Swal.fire({
          title: 'Are you sure BLOCK this color?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then(async (result) => { // Thêm async vào hàm callback
          if (result.isConfirmed) {
            const color = {
              id_color: id,
              nameColor: name,
              codeColor: code,
              isDelete: 1
            };
            try {
              // Sử dụng await bên trong hàm async
              const response = await updateColor(color);
              if (response.status === 200) {
                Swal.fire(
                  'Successful',
                  'Data has been BLOCKED',
                  'success'
                );
                setChange((prev)=>(prev+1))
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Something went wrong, Please try Again',
                });
              }
            } catch (error) {
              console.error('Lỗi:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Cannot BLOCK this color',
              });
            }
          }
        });
      }else{
        Swal.fire({
          title: 'Are you sure UNBLOCK this color?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then(async (result) => { // Thêm async vào hàm callback
          if (result.isConfirmed) {
            const color = {
             " id_color": id,
              "nameColor": name,
             " codeColor": code,
              "isDelete": 0
            };
            try {
              // Sử dụng await bên trong hàm async
              const response = await updateColor(color);
              console.log("TEST:", response.status);
              if (response.status === 200) {
                Swal.fire(
                  'Successful',
                  'Data has been UNBLOCKED.',
                  'success'
                );
                setChange((prev)=>(prev+1))
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Something went wrong, Please try again',
                });
              }
            } catch (error) {
              console.error('Lỗi:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Cannot UNBLOCK data.',
              });
            }
          }
        });
      }
    };
    const handleUpdate=async(id,name,code,status)=>{
      if(status!==0){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This color has been BLOCK, cannot UPDATE",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        
        return true;
      }
      setIdColor(id);
      setCurrentColorNameUpdate(name);
      setCurrentColorCodeUpdate(code);
      setStatusColor(status);
      handleOpenUpdate();
    }
    const handleSaveUpdate=()=>{
      handleCloseUpdate()
      Swal.fire({
        title: 'Are you sure UPDATE this color?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
      
        customClass: {
          popup: 'swal-popup' // Đặt tên class tùy ý
      },
      }).then(async (result) => { // Thêm async vào hàm callback
        if (result.isConfirmed) {
        
          const ColorUpdate={
            "id_color":idColor,
            "nameColor":currentColorNameUpdate,
            "codeColor":currentColorCodeUpdate,
            "isDelete":statusColor
          };
          try {
            // Sử dụng await bên trong hàm async
            const response = await updateColor(ColorUpdate);
            if (response.status === 200) {
              Swal.fire(
                'UPDATE Successfuly!',
                'Data has been UPDATED.',
                'success'
              );
              setChange((prev)=>(prev+1))
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong, Please try again.',
              });
            }
          } catch (error) {
            console.error('Lỗi:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Cannot UPDATE Data.',
            });
          }
        }
      });
    }
    useEffect(()=>{
        const rowData = async ()=>{
            const result= await axios.get(`http://localhost:8082/identity/api/color/display?page=${page}&size=${pageSize}`)
            setColor(result.data.content);
          
            setTotalPages(result.data.totalPages);
            settotalElements(result.data.totalElements);
        }
        rowData();
       console.log(color);
    },[page,pageSize,change])
    const columns = [
        { field: 'stt', headerName: 'Stt', width: 70,
        },
        { field: 'nameColor', headerName: 'Color Name', width: 130 },
        { field: 'codeColor', headerName: 'Color Code', width: 130 },
        {
          field: 'Update',
          headerName: 'Update',
          sortable:false,
          width: 140,
        
          renderCell:(params)=>(
            params.row.id_color!==null?(
                <Button onClick={()=>handleUpdate(params.row.id_color,params.row.nameColor,params.row.codeColor,params.row.isDelete)} sx={{ ml: 'auto',display:'flex' ,mt:1}} variant="outlined" color="infor" >
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
                <Button onClick={()=>handleBlock(params.row.id_color,params.row.nameColor,params.row.codeColor,params.row.isDelete)} sx={{ ml: 'auto',display:'flex',mt:1 }} variant="outlined" color="error" >
                BLOCK
            </Button>
            ):(
                <Button onClick={()=>handleBlock(params.row.id_color,params.row.nameColor,params.row.codeColor,params.row.isDelete)} sx={{ ml: 'auto',display:'flex',mt: 1 }} variant="outlined" color="error" >
                UNBLOCK
            </Button>  
            )
         )
        },
      ];
      const rowsWithStt = color.map((row, index) => ({
        ...row,
        stt: index + 1, // Đếm từ 1
      }));
      
  return (

    <AdminLayout>
    <SearchBar/>
    <Button onClick={handleOpen} sx={{ ml: 'auto',display:'flex',mt:1,mb:1 }} variant="contained" color="success"   endIcon={<Add />}>
    ADD
</Button>

    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsWithStt}
        columns={columns}
        getRowId={(row) => row.id_color}
        rowCount={totalElements}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
      {/* modal create colorcolor */}
       <Modal open={open} onClose={handleClose}>
                <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '300px', margin: '100px auto', backgroundColor: '#fff' }}>
                    <h3>Thêm màu mới</h3>
                    <input
                        type="text"
                        placeholder="Tên màu"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <SketchPicker
                        color={selectedColor}
                        onChange={(color) => setSelectedColor(color.hex)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="success" onClick={handleSave} style={{ marginRight: '10px' }}>Lưu</Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Đóng</Button>
                </div>
            </Modal>
    {/* modal update color */}

    <Modal open={openUpdate} onClose={handleCloseUpdate}>
                <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '300px', margin: '100px auto', backgroundColor: '#fff' }}>
                    <h3>Cập nhật màu</h3>
                    <input
                        type="text"
                        placeholder="Tên màu"
                        value={currentColorNameUpdate}
                        onChange={(e) => setCurrentColorNameUpdate(e.target.value)}
                        style={{ marginBottom: '10px', padding: '5px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <SketchPicker
                        color={currentColorCodeUpdate}
                        onChange={(color) => setCurrentColorCodeUpdate(color.hex)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Button onClick={()=>handleSaveUpdate()} variant="contained" color="success"  style={{ marginRight: '10px' }}>Lưu</Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseUpdate}>Đóng</Button>
                </div>
            </Modal>
    </Paper>
    </AdminLayout>
    
  );
};
export default Color;