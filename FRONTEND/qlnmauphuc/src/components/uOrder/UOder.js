import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Badge, Button, Divider, Grid, Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderData } from "../../redux/Action";
import All from "./All";
import { styled } from "@mui/material/styles";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import { MyTextField } from "../utility/Utility";

const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

export default function UOder() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const order = useSelector((state) => state.order);
  const { enqueueSnackbar } = useSnackbar();
  const { orderData } = order;
  const [all, setAll] = useState();
  const [processing, setProcessing] = useState();
  const [sewing, setSewing] = useState();
  const [sewingComplete, setSewingComplete] = useState();
  const [transport, setTransport] = useState();
  const [complete, setComplete] = useState();
  const [cancel, setCancel] = useState();
  const [value, setValue] = useState("1");
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getOrderData({ id: userInfo.id }));
  }, []);

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
          orderData.order_statusid === 3 
      )
    );
    setSewingComplete(
      orderData.filter(
        (orderData) =>
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


  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0))
  );

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const [orderID, setOrderID] = useState("");

  const handleSubmit = () => {
    if (
      Date.parse(endDate) >
      Date.parse(new Date(new Date().setHours(23, 59, 59, 0)))
    ) {
      enqueueSnackbar("Không được chọn ngày lớn hơn ngày hiện tại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (Date.parse(startDate) > Date.parse(endDate)) {
      enqueueSnackbar("Ngày bắt đầu không được lớn hơn ngày kết thúc", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    dispatch(
      getOrderData({
        id: userInfo.id,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
        orderID: orderID,
      })
    );
    enqueueSnackbar("Lọc thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
  }

  return (
    <Grid container>
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={4}>
                <MyTextField
                  id="id"
                  label="Mã hoá đơn"
                  placeholder="Nhập mã hoá đơn"
                  margin="normal"
                  value={orderID}
                  fullWidth
                  onChange={(e) => setOrderID(e.target.value)}
                  size="small"
                  sx={{mt:0}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Từ ngày"
                  inputFormat="dd/MM/yyyy"
                  value={startDate}
                  onChange={handleChangeStartDate}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Đến ngày"
                  inputFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={handleChangeEndDate}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{width: '95%', mr: 1}}
                >
                  Tìm kiếm
                </Button>
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12}>
              <Divider sx={{ mb: 1 }} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ border: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                >
                  <Tab
                    label={
                      <MyBadge badgeContent={all.length} color="primary">
                        Tất cả
                      </MyBadge>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={processing.length} color="primary">
                        Chờ xác nhận
                      </MyBadge>
                    }
                    value="2"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={sewing.length} color="primary">
                        Đang may
                      </MyBadge>
                    }
                    value="3"
                  />
                  <Tab
                    label={
                      <MyBadge
                        badgeContent={sewingComplete.length}
                        color="primary"
                      >
                        Đã may xong
                      </MyBadge>
                    }
                    value="4"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={transport.length} color="primary">
                        Đang giao
                      </MyBadge>
                    }
                    value="5"
                  />

                  <Tab
                    label={
                      <MyBadge badgeContent={complete.length} color="primary">
                        Hoàn tất
                      </MyBadge>
                    }
                    value="6"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={cancel.length} color="primary">
                        Đã huỷ
                      </MyBadge>
                    }
                    value="7"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <All userid={userInfo.id} data={all} />
              </TabPanel>
              <TabPanel value="2">
                <All data={processing} />
              </TabPanel>
              <TabPanel value="3">
                <All data={sewing} />
              </TabPanel>
              <TabPanel value="4">
                <All data={sewingComplete} />
              </TabPanel>
              <TabPanel value="5">
                <All data={transport} />
              </TabPanel>
              <TabPanel value="6">
                <All data={complete} />
              </TabPanel>
              <TabPanel value="7">
                <All data={cancel} />
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={12}></Grid>
        </>
      )}
    </Grid>
  );
}
