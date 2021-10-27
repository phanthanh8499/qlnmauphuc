import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { format } from "date-fns";
import React, { PureComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getEcommerceReportLineChart } from "../../redux/Action";

const data = [
  {
    name: "Page A",
    uv: 590,
    pv: 800,
  },
  {
    name: "Page B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default function OrderChart() {
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const ecommerceReport = useSelector((state) => state.ecommerceReport)
  const {loadingLC, dataLineChart} = ecommerceReport;
  useEffect(() => {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(now);
    var endDate = new Date(now);
    if (now.toLocaleDateString("en-us", { weekday: "long" }) === 'Sunday'){
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
    dispatch(getEcommerceReportLineChart(dataSend));
  }, []);
  
  return (
    <>
      {loadingLC ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={dataLineChart}
            margin={{
              top: 20,
              right: 20,
              bottom: 25,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="revenue_date" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" barSize={20} fill="#3688fc" />
            <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
