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
import {useDispatch, useSelector} from 'react-redux';
import { getOrderReportStackChart } from "../../redux/Action";

export default function PStackChart () {
//  const [loading, setLoading] = useState(true);
//  const [data, setData] = useState([]);
 const dispatch = useDispatch();
 const orderReport = useSelector((state) => state.orderReport)
 const {loadingSC, dataStackChart} = orderReport;
 useEffect(() => {
   var now = new Date();
   now.setHours(0, 0, 0, 0);
   var startDate = new Date(now);
   var endDate = new Date(now);
   if (now.toLocaleDateString("en-us", { weekday: "long" }) === "Sunday") {
     startDate.setDate(startDate.getDate() - startDate.getDay() - 6);
     endDate.setDate(endDate.getDate() - endDate.getDay());
     endDate.setHours(23, 59, 59, 0);
   } else {
     startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
     endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
     endDate.setHours(23, 59, 59, 0);
   }

   const dataSend = {
     startDate: format(startDate, "yyyy-MM-dd"),
     endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
   };
   dispatch(getOrderReportStackChart(dataSend, 5));
  //  async function getRevenueData() {
  //    const { data } = await axios.post(`/admin/getTailorOrder`, dataSend);
  //    const defaultValue = 5;
  //    let temp = [];
  //    for(let i=0; i<data.length; i++){
  //      temp.push({
  //        name: data[i].name,
  //        uv:
  //          defaultValue - data[i].value < 0 ? 0 : defaultValue - data[i].value,
  //        pv: data[i].value,
  //      });
  //    }
  //    setData(temp)
  //    setLoading(false);
  //  }
  //  getRevenueData();
 }, []);
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loadingSC ? (
            <CircularProgress />
          ) : (
            <ResponsiveContainer
              width={dataStackChart.length <= 5 ? "50%" : "100%"}
              height="100%"
            >
              <BarChart
                // width={500}
                height={100}
                data={dataStackChart}
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
        </Box>
      </>
    );

}
