import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import Male from './male/Male';
import Female from "./female/Female";
import { useDispatch } from 'react-redux';

export default function MeasurementBox() {
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Nam" value="1" />
              <Tab label="Nữ" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Male></Male>
          </TabPanel>
          <TabPanel value="2">
            <Female></Female>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}
