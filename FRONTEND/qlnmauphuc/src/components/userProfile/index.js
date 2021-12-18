import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UProfile from "./UProfile";
import UChangePassword from "./UChangePassword";

export default function UserProfile() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ border: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Thông tin cá nhân" value="1" />
            <Tab label="Thay đổi mật khẩu" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UProfile></UProfile>
        </TabPanel>
        <TabPanel value="2">
          <UChangePassword></UChangePassword>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
