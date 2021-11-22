import { Dialog, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ImageMagnify from "./ImageMagnify";
import { Box } from "@mui/system";
import AFCompany from "./AFCompany";
import AFCustomer from "./AFCustomer";
import { useDispatch } from "react-redux";
import { XOA_HINH_ANH } from "../../../constants/Constants";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  detailBox: {
    padding: "0px 20px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AddForm(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({ type: XOA_HINH_ANH });
  };
  const { open, onClose, id, userid } = props;
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        <Grid item xs={4}>
          <ImageMagnify></ImageMagnify>
        </Grid>
        <Grid item xs={8} className={classes.detailBox}>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="basic tabs example"
              >
                <Tab label="Nhà may" {...a11yProps(0)} />
                <Tab label="Khách hàng" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </Grid>

          <TabPanel value={value} index={0}>
            <Grid container spacing={1}>
              <AFCompany onClose={onClose} id={id} userid={userid}></AFCompany>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container spacing={1}>
              <AFCustomer onClose={onClose} id={id} userid={userid}></AFCustomer>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddForm;
