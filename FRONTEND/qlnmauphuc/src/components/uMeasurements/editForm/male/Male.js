import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Shirt from "./Shirt";
import Pants from "./Pants";
import { LOCAL_PATH } from "../../../../constants/Constants";

export default function Male(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <img
          src={LOCAL_PATH + "images/cach-lay-so-do-quan-ao-nam.jpg"}
          alt="cach-lay-so-do-quan-ao-nam"
        ></img>
      </Grid>
      <Grid item xs={5}>
        <Grid container>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Số đo Áo" value="1" />
                  <Tab label="Số đo Quần" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Shirt></Shirt>
              </TabPanel>
              <TabPanel value="2">
                <Pants></Pants>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
