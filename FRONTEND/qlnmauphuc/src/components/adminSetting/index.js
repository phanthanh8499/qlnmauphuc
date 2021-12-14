import { CircularProgress, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { Copyright } from "../utility/Utility";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EmailConfig from "./EmailConfig";
import { BACKGROUNDADM } from "../../constants/Constants";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
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

export default function AdminProfile() {
  const classes = useStyles();

  const [value, setValue] = useState("1");

  const users = useSelector((state) => state.users);
  const { loadingPermissions, permissionData } = users;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      {loadingPermissions ? (
        <Box
          item
          sx={{
            height: 637,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : permissionData[0].up_setting === false ? null : (
        <>
          <Box sx={{ width: "100%", typography: "body1", height: "600px" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Cấu hình email" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <EmailConfig />
              </TabPanel>
            </TabContext>
          </Box>
          <Copyright />
        </>
      )}
    </Box>
  );
}
