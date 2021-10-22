import axios from "axios";
import { format } from "date-fns";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function PStackChart () {
 const [loading, setLoading] = useState(true);
 const [data, setData] = useState([]);
 useEffect(() => {
   var now = new Date();
   now.setHours(0, 0, 0, 0);
   var startDate = new Date(now);
   startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
   var endDate = new Date(now);
   endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
   endDate.setHours(23, 59, 59, 0);
   const dataSend = {
     startDate: format(startDate, "yyyy-MM-dd"),
     endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
   };
   async function getRevenueData() {
     const { data } = await axios.post(`/admin/getTailorOrder`, dataSend);
     const defaultValue = 5;
     let temp = [];
     for(let i=0; i<data.length; i++){
       temp.push({
         name: data[i].name,
         uv:
           defaultValue - data[i].value < 0 ? 0 : defaultValue - data[i].value,
         pv: data[i].value,
       });
     }
     setData(temp)
     setLoading(false);
   }
   getRevenueData();
 }, []);
    return (
      <>
        {loading ? (
          <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={150}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" stackId="a" fill="#727cf5" />
              
              <Bar dataKey="uv" stackId="a" fill="#e3eaef" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </>
    );

}
