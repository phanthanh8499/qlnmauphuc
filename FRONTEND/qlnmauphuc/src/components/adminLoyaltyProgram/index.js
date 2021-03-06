import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { getLoyaltyCustomerData } from "../../redux/Action";
import {  styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import { BACKGROUNDADM } from "../../constants/Constants";
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

export default function AdminLoyaltyProgram() {
  const classes = useStyles();
  const loyaltyCustomer = useSelector((state) => state.loyaltyCustomer);
  const { loading, loyaltyCustomerData } = loyaltyCustomer;
  const users = useSelector((state) => state.users);
  const { loadingPermissions, permissionData } = users;
  const [loadingState, setLoadingState] = useState(true);
  const [startD, setStartD] = useState(new Date());
  const [endD, setEndD] = useState(new Date());
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
    setStartD(startDate);
    setEndD(endD);
    const dataSend = {
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getLoyaltyCustomerData(dataSend));
  },[]);

  const [dcn, setDcn] = useState([]);
  const [ccn, setCcn] = useState([]);

  useEffect(() => {
    setLoadingState(true);
    setDcn(loyaltyCustomerData.filter((item) => item.user_firstname !== null));
    setCcn(loyaltyCustomerData.filter((item) => item.user_firstname === null));
    setLoadingState(false);
  }, [loyaltyCustomerData]);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      {loading || loadingState || loadingPermissions ? (
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
      ) : permissionData[0].up_loyaltyprogram === false ? null : (
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
                          <MyBadge badgeContent={dcn.length} color="primary">
                            ???? c???p nh???t
                          </MyBadge>
                        }
                        value="1"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={ccn.length} color="primary">
                            Ch??a c???p nh???t
                          </MyBadge>
                        }
                        value="2"
                      />
                    </TabList>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <Divider sx={{ margin: "0px 0px -5px 0px" }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={dcn} startD={startD} endD={endD} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={ccn} startD={startD} endD={endD} isCcn />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
