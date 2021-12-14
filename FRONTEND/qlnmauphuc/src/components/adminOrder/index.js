import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Badge,
} from "@mui/material";
import { getOrderData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import {
  MyFormControl,
} from "../utility/Utility";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import Box from "@mui/material/Box";
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
  const users = useSelector((state) => state.users);
  const { loadingPermissions, permissionData } = users;
  const dispatch = useDispatch();
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
    setStartDate(startDate);
    setEndDate(endDate >= new Date() ? new Date() : endDate);
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
  const [late, setLate] = useState();
  const [unpaid, setUnpaid] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState(0);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    getProvinceData();
  }, []);

  useEffect(() => {
    var now = new Date();
    setLoading(true);
    setAll(orderData);
    const lateOrder = orderData.filter(
      (orderData) =>
        orderData.order_statusid >= 2 &&
        orderData.order_statusid <= 3 &&
        Date.parse(orderData.order_enddate) <= Date.parse(now)
    );
    const unpaidOrder = orderData.filter(
      (orderData) =>
        orderData.order_statusid >= 4 &&
        orderData.order_statusid <= 5 &&
        orderData.order_shippingid === "TNM" &&
        Date.parse(orderData.order_enddate) <= Date.parse(now)
    );
    setProcessing(
      orderData.filter((orderData) => orderData.order_statusid === 0)
    );
    const sewingOrder = orderData.filter(
      (orderData) =>
        orderData.order_statusid === 1 ||
        orderData.order_statusid === 2 ||
        orderData.order_statusid === 3 ||
        orderData.order_statusid === 4
    );
    console.log(sewingOrder);
    function isSewing(num) {
      for (let i = 0; i < lateOrder.length; i++) {
        if (num.od_orderid === lateOrder[i].od_orderid) {
          return false;
        }
      }
      for (let i = 0; i < unpaidOrder.length; i++) {
        if (num.od_orderid === unpaidOrder[i].od_orderid) {
          return false;
        }
      }
      return num;
    }
    setSewing(sewingOrder.filter(isSewing));
    console.log();
    setLate(lateOrder);
    setUnpaid(unpaidOrder);
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

  const handleClickSearch = () => {
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
    } else {
      const dataSend = {
        id: 0,
        provinceId: province,
        districtId: district,
        wardId: ward,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      };
      dispatch(getOrderData(dataSend));
    }
  };

  const handleChangeProvince = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(`/getDistrict.${e.target.value}`);
    setDistrictData(data);
    setWardData([]);
    setDistrict(0);
    setWard(0);
  };
  const handleChangeDistrict = async (e) => {
    setDistrict(e.target.value);
    const { data } = await axios.get(`/getWard.${province}&${e.target.value}`);
    setWardData(data);
    setWard(0);
  };
  const handleChangeWard = (e) => {
    setWard(e.target.value);
  };

  const renderAddressForm = () => {
    return (
      <>
        <Grid item xs={2} sx={{ ml: 0.5 }}>
          <MyFormControl fullWidth>
            <InputLabel id="province-select-label">Tỉnh/Thành</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-simple-select"
              defaultValue={province}
              label="Tỉnh/Thành"
              onChange={handleChangeProvince}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {provinceData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.province_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={2}>
          <MyFormControl fullWidth>
            <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-simple-select"
              defaultValue={district}
              label="Quận/Huyện"
              onChange={handleChangeDistrict}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {districtData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.district_prefix} {value.district_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={2}>
          <MyFormControl fullWidth>
            <InputLabel id="ward-select-label">Xã/Phường</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-simple-select"
              defaultValue={ward}
              label="Xã/Phường"
              onChange={handleChangeWard}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {wardData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.ward_prefix} {value.ward_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
      </>
    );
  };

  return (
    <Grid container className={classes.root}>
      {loading || loadingPermissions ? (
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
      ) : permissionData[0].up_ordermanager === false ? null : (
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
                      <MyTab
                        label={
                          <MyBadge badgeContent={late.length} color="primary">
                            May trễ hạn
                          </MyBadge>
                        }
                        value="7"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={unpaid.length} color="primary">
                            Chưa nhận hàng
                          </MyBadge>
                        }
                        value="8"
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
              <Grid container>
                <Grid item xs={10}>
                  <Grid container spacing={1}>
                    {renderAddressForm()}

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Grid item xs={2}>
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
                      <Grid item xs={2}>
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
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid item xs={2} align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickSearch}
                    sx={{ mr: 0.5, backgroundColor: "#ffffff" }}
                  >
                    Tìm kiếm
                  </Button>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={all} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={processing} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={sewing} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={transport} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="5" sx={{ padding: 0 }}>
                <Data data={complete} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="6" sx={{ padding: 0 }}>
                <Data data={cancel} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="7" sx={{ padding: 0 }}>
                <Data data={late} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="8" sx={{ padding: 0 }}>
                <Data data={unpaid} startD={startDate} endD={endDate} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
