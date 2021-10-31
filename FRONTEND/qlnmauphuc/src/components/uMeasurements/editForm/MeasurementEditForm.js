import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CircularProgress, Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Male from "./male/Male";
import Female from "./female/Female";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetailMeasurements } from "../../../redux/Action";

export default function MeasurementEditForm() {
  let { id } = useParams();
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function getDetailMeasurement() {
  //     const { data } = await axios.get(`/getDetailMeasurements.${id}`);
  //     dispatch(getDetailMeasurements(parseInt(id)));
  //     setData(data);
  //     setLoading(false);
  //   }
  //   getDetailMeasurement();
  // }, [id]);
  const measurements = useSelector((state) => state.measurements);
  const { loadingDetail, detailData } = measurements;
  useEffect(() => {
    dispatch(getDetailMeasurements(parseInt(id)));
    setLoading(false);
  }, [id]);
  return (
    <Grid container>
      {loadingDetail || loading ? (
        <Grid
          item
          xs={12}
          sx={{
            height: 303,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <TabContext value={value}>
            {detailData[0].id !== parseInt(id) ? (
              <Grid
                item
                xs={12}
                sx={{
                  height: 303,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Grid>
            ) : detailData[0].m_gender === "male" ? (
              <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Nam" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Male></Male>
                </TabPanel>
              </>
            ) : (
              <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Nữ" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Female></Female>
                </TabPanel>
              </>
            )}
          </TabContext>
        </Grid>
      )}
    </Grid>
  );
}
