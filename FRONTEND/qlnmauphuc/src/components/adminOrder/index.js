import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid, GridOverlay, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { getOrderData, getProductData } from "../../redux/Action";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import { format } from "date-fns";

const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

const MyTab = styled(Tab)(({theme}) => ({
  textTransform: "none",
  padding: '12px 21px',
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport variant="outlined" utf8WithBom={true}/>
      {/* <Button variant="outlined" color="primary">
      </Button> */}
    </GridToolbarContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
}));



export default function AdminOrder() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const order = useSelector((state) => state.order);
  const { orderData, error } = order;
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
    var sd = new Date('2021-9-1')
    var ed = new Date('2021-10-24')
    ed.setHours(23, 59, 59, 0); 
    const dataSend = {
      id: 0,
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      startDate: format(sd, "yyyy-MM-dd"),
      endDate: format(ed, "yyyy-MM-dd HH:mm:ss"),
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
  const [dataSearch, setDataSearch] = useState([]);
  const [dataSearchBK, setDataSearchBK] = useState([]);

  useEffect(() => {
    setAll(orderData);
    setDataSearch(orderData);
    setDataSearchBK(orderData);
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
  const [isSearch, setIsSearch] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Grid container component={Paper}>
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
                <Data data={all} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={processing} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={sewing} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={transport} />
              </TabPanel>
              <TabPanel value="5" sx={{ padding: 0 }}>
                <Data data={complete} />
              </TabPanel>
              <TabPanel value="6" sx={{ padding: 0 }}>
                <Data data={cancel} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
