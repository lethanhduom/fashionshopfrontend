import React, { useEffect, useState } from "react";
import AdminLayout from "../Component/AdminLayout";
import SearchBar from "../Component/searchbar";
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
import { Edit, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { actionUser, createAccountByAdmin, getAccounts, updateAccountByUser } from "../../Service/AuthenService";
import { Add } from "@mui/icons-material";
import Swal from "sweetalert2";
import ModalCreateAccount from "../Component/ModalCreateAccount";
import EditAccountModal from "../Component/EditAccount";

const AccountPage = () => {
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [change, setChange] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchData = async () => {
    const res = await getAccounts(page, rowsPerPage, searchKeyword);
    setPageData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, change, searchKeyword]);

  const handleCreateAccount = async (newAccount) => {
    const res = await createAccountByAdmin(newAccount);
    if (res.status === 200 || res.status === 201) {
      Swal.fire("Successful", "Account has been created.", "success");
      setChange((prev) => prev + 1);
    }
  };

  const handleSearch = (query) => {
    setSearchKeyword(query);
    setPage(0); // reset về trang đầu khi tìm kiếm
  };
  const handleAction=async(id,status)=>{
    const res=await actionUser(id);
    if(status===0){
      Swal.fire("Successful", "Account has been unlocked.", "success");
  setChange((prev) => prev + 1);
    }else{
      Swal.fire("Successful", "Account has been locked.", "success");
      setChange((prev) => prev + 1);
    }
  }
  const handleUpdate=async(data)=>{
const res= await updateAccountByUser(data);
console.log("TEST",data);
if(res.status===200){
  Swal.fire("Successful", "Account has been updated.", "success");
  setChange((prev) => prev + 1);
}
  }
  return (
    <AdminLayout>
      <SearchBar onSearch={handleSearch} />

      <Button
        onClick={() => setOpenModal(true)}
        sx={{ ml: "auto", display: "flex", mt: 1 }}
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
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Create Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(pageData?.content) &&
                pageData.content.map((account) => (
                  <TableRow key={account.id_user}>
                    <TableCell>{account.fullname}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.phone}</TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.createTime}</TableCell>
                    <TableCell>
                      {account.status === 0 ? "Not Active" : "Active"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setSelectedAccount(account);
                          setOpenEditModal(true);
                        }}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={()=>handleAction(account.id_user,account.status)} color="primary">
                        {account.status === 1 ? (
                          <LockKeyhole />
                        ) : (
                          <LockKeyholeOpen />
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

      <ModalCreateAccount
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(newAccount) => handleCreateAccount(newAccount)}
      />

      <EditAccountModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        accountData={selectedAccount}
        onSubmit={(updatedAccount) => {
       handleUpdate(updatedAccount)
        }}
      />
    </AdminLayout>
  );
};

export default AccountPage;
