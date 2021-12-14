import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Badge, CircularProgress, Divider, Grid,  Paper } from "@mui/material";
import {  getStaffData} from "../../redux/Action";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
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

export default function AdminStaff() {
  const classes = useStyles();
  const users = useSelector((state) => state.users);
  const { loadingStaff, staffData} = users;
  const { loadingPermissions, permissionData } = users;
  const [loadingState, setLoadingState] = useState(true)
  const dispatch = useDispatch()
  const [startD, setStartD] = useState(new Date())
  const [endD, setEndD] = useState(new Date())
  useEffect(() => {
    dispatch(getStaffData());
    setStartD(new Date())
    setEndD(new Date())
  }, []);

  const [nv, setNv] = useState([]);
  const [qt, setQt] = useState([]);

  useEffect(() => {
   
    setNv(staffData.filter((item) => item.user_typeid === "NV"));
  
    setQt(staffData.filter((item) => item.user_typeid === "AD"));
    setLoadingState(false);
  }, [staffData]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  return (
    <Grid container className={classes.root}>
      {loadingStaff || loadingState || loadingPermissions ? (
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
      ) : permissionData[0].up_staffaccountmanager === false ? null : (
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
                          <MyBadge badgeContent={nv.length} color="primary">
                            Nhân viên
                          </MyBadge>
                        }
                        value="1"
                      />

                      <MyTab
                        label={
                          <MyBadge badgeContent={qt.length} color="primary">
                            Quản trị
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
                <Data data={nv} startD={startD} endD={endD} isNv />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={qt} startD={startD} endD={endD} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
