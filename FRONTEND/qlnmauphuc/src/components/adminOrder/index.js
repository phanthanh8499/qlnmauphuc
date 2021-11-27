import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, CircularProgress, Divider, Grid, Paper } from "@mui/material";
import { getOrderData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import { format } from "date-fns";
import { BACKGROUNDADM } from "../../constants/Constants";
const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
  root: {
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    height: 637,
    padding: "10px",
    backgroundImage: `url("${BACKGROUNDADM}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function AdminOrder() {
  const classes = useStyles();
  const order = useSelector((state) => state.order);
  const { orderData, error } = order;
  const dispatch = useDispatch();
  const [startD, setStartD] = useState(new Date());
  const [endD, setEndD] = useState(new Date());
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
    setStartD(startDate);
    setEndD(endD);
    const dataSend = {
      id: 0,
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getOrderData(dataSend));
  }, [dispatch]);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState();
  const [sewing, setSewing] = useState();
  const [transport, setTransport] = useState();
  const [complete, setComplete] = useState();
  const [cancel, setCancel] = useState();
  const [all, setAll] = useState([]);

  useEffect(() => {
    setLoading(true);
    setAll(orderData);
    setProcessing(
      orderData.filter((orderData) => orderData.order_statusid === 0)
    );
    setSewing(
      orderData.filter(
        (orderData) =>
          orderData.order_statusid === 1 ||
          orderData.order_statusid === 2 ||
          orderData.order_statusid === 3 ||
          orderData.order_statusid === 4
      )
    );
    setTransport(
      orderData.filter((orderData) => orderData.order_statusid === 5)
    );
    setComplete(
      orderData.filter((orderData) => orderData.order_statusid === 6)
    );
    setCancel(orderData.filter((orderData) => orderData.order_statusid === 10));
    setLoading(false);
  }, [orderData]);

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "570px",
            backgroundColor: "rgb(0 0 0 / 2%);",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <TabContext value={value}>
            <Grid item xs={12} className={classes.topBar}>
              <Grid container>
                <Grid item xs={9}>
                  <Box sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <MyTab
                        label={
                          <MyBadge badgeContent={all.length} color="primary">
                            Tất cả
                          </MyBadge>
                        }
                        value="1"
                      />
                      <MyTab
                        label={
                          <MyBadge
                            badgeContent={processing.length}
                            color="primary"
                          >
                            Chờ xác nhận
                          </MyBadge>
                        }
                        value="2"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={sewing.length} color="primary">
                            Trong quá trình may
                          </MyBadge>
                        }
                        value="3"
                      />
                      <MyTab
                        label={
                          <MyBadge
                            badgeContent={transport.length}
                            color="primary"
                          >
                            Đang giao
                          </MyBadge>
                        }
                        value="4"
                      />

                      <MyTab
                        label={
                          <MyBadge
                            badgeContent={complete.length}
                            color="primary"
                          >
                            Hoàn tất
                          </MyBadge>
                        }
                        value="5"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={cancel.length} color="primary">
                            Đã huỷ
                          </MyBadge>
                        }
                        value="6"
                      />
                    </TabList>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "0px 0px 5px 0px" }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={all} startD={startD} endD={endD}/>
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={processing} startD={startD} endD={endD}/>
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={sewing} startD={startD} endD={endD}/>
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={transport} startD={startD} endD={endD}/>
              </TabPanel>
              <TabPanel value="5" sx={{ padding: 0 }}>
                <Data data={complete} startD={startD} endD={endD}/>
              </TabPanel>
              <TabPanel value="6" sx={{ padding: 0 }}>
                <Data data={cancel} startD={startD} endD={endD}/>
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
