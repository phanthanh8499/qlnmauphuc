import {
  Tab,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, {useState } from "react";
import { Box } from "@mui/system";
import { Copyright} from "../utility/Utility";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfileForm from "./ProfileForm";
import ChangePassForm from "./ChangePassForm";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    height: 555,
    padding: '20px',
  },
}));

export default function AdminProfile() {
  const classes = useStyles();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Thông tin cá nhân" value="1" />
              <Tab label="Thay đổi mật khẩu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProfileForm />
          </TabPanel>
          <TabPanel value="2">
            <ChangePassForm/>
          </TabPanel>
        </TabContext>
      </Box>
      <Copyright/>
    </Box>
  );
}
