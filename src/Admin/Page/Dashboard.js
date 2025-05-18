// src/pages/Dashboard.jsx
import { Box, Grid, Paper, Typography, TextField } from "@mui/material";
import Sidebar from "../Component/Sidebar";
import AdminLayout from "../Component/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {/* <TextField fullWidth placeholder="Search anything here..." variant="outlined" sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Web Development</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">App Development</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">UX & UI</Typography>
            </Paper>
          </Grid>
        </Grid> */}
      </Box>
    </Box>


    
    </AdminLayout>
  );
};

export default Dashboard;
