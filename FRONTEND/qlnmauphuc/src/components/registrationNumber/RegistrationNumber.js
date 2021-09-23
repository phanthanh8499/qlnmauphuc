import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {makeStyles} from '@mui/styles'
import Divider from "@mui/material/Divider";
import Male from "./male/Male";
import Female from "./female/Female";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const useStyles = makeStyles((theme) => ({
  list: {
    border: "1px solid #f0f0f0",
    margin: '0px 5px 0px 0px',
  },
}));

const center = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
}

export default function RegistrationNumber() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid item xs={1} className={classes.list} component={Paper}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button>
            <ListItemText primary="1" sx={center} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="2" sx={center} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="3" sx={center} />
          </ListItem>
          <Divider light />
          <ListItem button sx={center}>
            <ControlPointIcon />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={11} component={Paper}>
        <Grid container>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
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
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
