import React from "react";

import AdminLayout from "../Component/AdminLayout";
import RevenueChart from "../Component/RevenueChart";

const StatisticsPage = () => {
  return (
    <AdminLayout>
  
      <h1 className="text-2xl font-bold mb-4">Thống kê doanh thu</h1>
      <RevenueChart />

    </AdminLayout>
  );
};

export default StatisticsPage;
