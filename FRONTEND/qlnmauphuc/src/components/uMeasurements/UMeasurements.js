import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getMeasurementsData } from "../../redux/Action";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const useStyles = makeStyles((theme) => ({
  list: {
    border: "1px solid #f0f0f0",
    margin: "0px 5px 0px 0px",
  },
}));

const center = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

export default function UMeasurements(props) {
  const classes = useStyles();
  const { id } = JSON.parse(localStorage.getItem("userInfo")).userInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeasurementsData(id));
  }, [dispatch]);
  const measurements = useSelector((state) => state.measurements);
  const { loading, measurementsData } = measurements;
  const renderList = () => {
    return measurementsData.map((value, key) => (
      <>
        {value.m_gender === "male" ? (
          <>
            <Link to={`/account/measurements-edit-${value.id}`}>
              <ListItem button>
                <MaleIcon />
                <ListItemText primary={key + 1} sx={center} />
              </ListItem>
            </Link>
            <Divider />
          </>
        ) : (
          <>
            <Link to={`/account/measurements-edit-${value.id}`}>
              <ListItem button>
                <FemaleIcon sx={{ color: "#ff0000" }} />
                <ListItemText primary={key + 1} sx={center} />
              </ListItem>
            </Link>
            <Divider />
          </>
        )}
      </>
    ));
  };
  return (
    <Grid container>
      <Grid item xs={1} className={classes.list} component={Paper}>
        {loading ? (
          <List component="nav" aria-label="mailbox folders">
            <Link to="/account/measurements-add">
              <ListItem button sx={center}>
                <ControlPointIcon sx={{ color: "#196600" }} />
              </ListItem>
            </Link>
          </List>
        ) : (
          <List component="nav" aria-label="mailbox folders">
            {renderList()}
            <Link to="/account/measurements-add">
              <ListItem button sx={center}>
                <ControlPointIcon sx={{ color: "#196600" }} />
              </ListItem>
            </Link>
          </List>
        )}
      </Grid>
      <Grid item xs={11} component={Paper}>
        {props.children}
      </Grid>
    </Grid>
  );
}
