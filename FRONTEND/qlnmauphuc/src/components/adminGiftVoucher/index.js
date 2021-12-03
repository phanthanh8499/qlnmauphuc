import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  getGiftVoucherData,
} from "../../redux/Action";
import {  styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import { BACKGROUNDADM } from "../../constants/Constants";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useSnackbar } from "notistack";
import { MyFormControl } from "../utility/Utility";
import { format } from "date-fns";


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

export default function AdminGiftVoucher() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const giftVoucher = useSelector((state) => state.giftVoucher);

  const { loading, giftVoucherData } = giftVoucher;
  const [loadingState, setLoadingState] = useState(true);
  const [startD, setStartD] = useState(new Date());
  const [endD, setEndD] = useState(new Date());
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
  const dispatch = useDispatch();

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
      id: 1,
      voucherDiscount: 0,
      isActive: "all",
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getGiftVoucherData(dataSend));
    setStartD(new Date())
    setEndD(new Date())
  },[]);

  const [all, setAll] = useState([]);
  const [noOwner, setNoOwner] = useState([]);
  const [owner, setOwner] = useState([]);
  const [expired, setExpired] = useState([]);
  const [voucher, setVoucher] = useState(0);
  const [active, setActive] = useState("all");
  const VOUCHERTYPE = [
    { id: 0, name: "Tất cả" },
    { id: 10, name: "Voucher giảm giá 10%" },
    { id: 15, name: "Voucher giảm giá 15%" },
    { id: 20, name: "Voucher giảm giá 20%" },
  ];
  const ACTIVETYPE = [
    { id: 'all', name: "Tất cả" },
    { id: 'true', name: "Đã kích hoạt" },
    { id: 'false', name: "Chưa kích hoạt" },
  ];
  useEffect(() => {
    setLoadingState(true);
    const now = new Date();
    const listNoOwner = giftVoucherData.filter((item) => item.gv_userid === 1);
    const listOwner = giftVoucherData.filter((item) => item.gv_userid !== 1);
    const expired = giftVoucherData.filter(
      (item) => Date.parse(item.gv_expirationdate) < Date.parse(now)
    );
    function isNotExpired(list) {
      for (let i = 0; i < expired.length; i++) {
        if (list.id === expired[i].id) {
          return false;
        }
      }
      return list;
    }
    setAll(giftVoucherData);
    setNoOwner(listNoOwner.filter(isNotExpired));
    setOwner(listOwner.filter(isNotExpired));
    setExpired(expired);
    setLoadingState(false);
  }, [giftVoucherData]);
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
        id: 1,
        voucherDiscount: voucher,
        isActive: active,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      };
      dispatch(getGiftVoucherData(dataSend));
    }
  };

  return (
    <Grid container className={classes.root}>
      {loading || loadingState ? (
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
                            badgeContent={noOwner.length}
                            color="primary"
                          >
                            Chưa có chủ sở hữu
                          </MyBadge>
                        }
                        value="2"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={owner.length} color="primary">
                            Đang có chủ sở hữu
                          </MyBadge>
                        }
                        value="3"
                      />
                      <MyTab
                        label={
                          <MyBadge
                            badgeContent={expired.length}
                            color="primary"
                          >
                            Hết hạn
                          </MyBadge>
                        }
                        value="4"
                      />
                    </TabList>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <Divider sx={{ margin: "0px 0px 0px 0px" }} />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  <Grid container spacing={1}>
                    <Grid item xs={3} sx={{ ml: 0.5 }}>
                      <MyFormControl fullWidth>
                        <InputLabel id="voucher-select-label">
                          Loại voucher
                        </InputLabel>
                        <Select
                          labelId="voucher-select-label"
                          id="voucher-simple-select"
                          defaultValue={voucher}
                          label="Loại voucher"
                          onChange={(e) => setVoucher(e.target.value)}
                        >
                          {VOUCHERTYPE.map((item, key) => (
                            <MenuItem value={item.id} key={key}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </MyFormControl>
                    </Grid>
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
                    <Grid item xs={2}>
                      <MyFormControl fullWidth>
                        <InputLabel id="active-select-label">
                          Kích hoạt
                        </InputLabel>
                        <Select
                          labelId="active-select-label"
                          id="active-simple-select"
                          defaultValue={active}
                          label="Kích hoạt"
                          onChange={(e) => setActive(e.target.value)}
                        >
                          {ACTIVETYPE.map((item, key) => (
                            <MenuItem value={item.id} key={key}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </MyFormControl>
                    </Grid>
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
                <Data data={noOwner} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={owner} startD={startDate} endD={endDate} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={expired} startD={startDate} endD={endDate} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
