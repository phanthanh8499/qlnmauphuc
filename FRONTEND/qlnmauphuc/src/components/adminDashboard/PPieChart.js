import { CircularProgress, Grid, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { format } from "date-fns";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { makeStyles } from "@mui/styles";

const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE", "#f00"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 4}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`SL: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 4}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const useStyles = makeStyles((theme) => ({
  square: {
    height: 10,
    width: 10,
    backgroundColor: "#fff000",
    display: "inline-block",
    marginRight: 5,
  },
  percent: {
    float: "right",
  },
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function PPieChart() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const [data, setData] = useState([]);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const [loading, setLoading] = useState(true);
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
    async function getRevenueData() {
      const { data } = await axios.post(`/admin/getCountOrder`, dataSend);
      setData([
        { name: "Đợi xử lý", value: parseInt(data[0].processing_count) },
        { name: "Đang may", value: parseInt(data[0].sewing_count) },
        { name: "Đang vận chuyển", value: parseInt(data[0].shipping_count) },
        { name: "Hoàn tất", value: parseInt(data[0].complete_count) },
        { name: "Huỷ bỏ", value: parseInt(data[0].cancel_count) },
      ]);
      setLoading(false);
    }
    getRevenueData();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <PieChart width={357} height={250}>
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <Grid container>
            {data.map((value, key) => (
              <Grid item xs={12} sx={{ pr: 8, pl: 8 }}>
                <Typography>
                  <Box
                    className={classes.square}
                    sx={{
                      backgroundColor: COLORS[key],
                    }}
                  ></Box>
                  {value.name}
                  <span className={classes.percent}>
                    {(
                      (data[key].value /
                        (data[0].value +
                          data[1].value +
                          data[2].value +
                          data[3].value +
                          data[4].value)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </Typography>
                <Divider />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
