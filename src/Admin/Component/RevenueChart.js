import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ResponsiveContainer
} from 'recharts';
import { getRevenueByMonth, getRevenueByYear } from '../../Service/OrderService';

function RevenueChart() {
  const [tab, setTab] = useState('month');
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('04-2025');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const url = tab === 'month'
        ?"month"
        : "year";
        if(url==="month"){
            const res = await getRevenueByYear(year);
            setData(res.data);
        }else{
            const res = await getRevenueByMonth(month);
            setData(res.data);
        }
    
    };
    fetchData();
  }, [tab, year, month]);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab('month')}>Theo năm</button>
        <button onClick={() => setTab('day')}>Theo tháng</button>
      </div>

      {tab === 'month' && (
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      )}

      {tab === 'day' && (
        <select onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="04-2025">04-2025</option>
          <option value="03-2025">03-2025</option>
        </select>
      )}

      <ResponsiveContainer width="100%" height={400}>
        {tab === 'month' ? (
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line dataKey="total" stroke="#8884d8" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
