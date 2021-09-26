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
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getMeasurementsData } from "../../redux/Action";
import { renderEditInputCell } from "@mui/x-data-grid";
import measurementBox from "./MeasurementBox";

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

export default function UMeasurements(props) {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const { id } = JSON.parse(localStorage.getItem("userInfo")).userInfo;
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getMeasurementsData(id));
  }, [dispatch]);
  const measurements = useSelector((state) => state.measurements);
  const { loading, measurementsData, error } = measurements;
  const renderList = () => {
    return measurementsData.map((value, key) => (
      <>
        <Link to={`/account/measurements-edit-${value.id}`}>
          <ListItem button>
            <ListItemText primary={key + 1} sx={center} />
          </ListItem>
        </Link>
        <Divider />
      </>
    ));
  };
  return (
    <Grid container>
      <Grid item xs={1} className={classes.list} component={Paper}>
        <List component="nav" aria-label="mailbox folders">
          {renderList()}
          <Link to="/account/measurements-add">
            <ListItem button sx={center}>
              <ControlPointIcon />
            </ListItem>
          </Link>
        </List>
      </Grid>
      <Grid item xs={11} component={Paper}>
        {props.children}
      </Grid>
    </Grid>
  );
}
