import { CircularProgress, Grid, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import React, {  useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { makeStyles } from "@mui/styles";
import { getEcommerceReportPieChart } from "../../redux/Action";
import { useDispatch, useSelector } from "react-redux";

const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE", "#f00", "#8884d8"];

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
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
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

export default function PPieChart() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
 
  const [sum, setSum] = useState(0)
  const dispatch = useDispatch();
  const ecommerceReport = useSelector((state) => state.ecommerceReport);
  const {loadingPC, dataPieChart} = ecommerceReport;

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
    dispatch(getEcommerceReportPieChart(dataSend));
  }, []);

  useEffect(() => {
    var temp = 0;
    for (let i = 0; i < dataPieChart.length; i++) {
      temp = parseInt(dataPieChart[i].value) + temp;
    }
    setSum(temp);
  }, [dataPieChart]);
  return (
    <>
      {loadingPC ? (
        <Box sx={{ width: "100%", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <PieChart width={357} height={240}>
            <Pie
              data={dataPieChart}
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
              {dataPieChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <Grid container>
            {dataPieChart.map((value, key) => (
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
                    {((dataPieChart[key].value / sum) * 100).toFixed(2)}%
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
