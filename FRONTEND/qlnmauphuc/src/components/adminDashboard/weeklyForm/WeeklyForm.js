import {
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import {
  getEcommerceReportLineChart,
  getEcommerceReportCountData,
  getEcommerceReportPieChart,
} from "../../../redux/Action";
import { MyFormControl } from "../../utility/Utility";
import { Box } from "@mui/system";
import { format } from "date-fns";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  img: {
    fontSize: "125px !important",
    color: "#ff0000",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#1976d2",
    fontSize: "20px !important",
    fontWeight: "500 !important",
  },
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function WeeklyForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {  onClose } = props;
  const handleSubmit = () => {
    if (selected) {
      const dataSend = {
        startDate: format(selected.startDate, "yyyy-MM-dd"),
        endDate: format(selected.endDate, "yyyy-MM-dd HH:mm:ss"),
        startDateLW: format(selected.startDateLW, "yyyy-MM-dd"),
        endDateLW: format(selected.endDateLW, "yyyy-MM-dd HH:mm:ss"),
      };
      dispatch(getEcommerceReportLineChart(dataSend));
      dispatch(getEcommerceReportCountData(dataSend));
      dispatch(getEcommerceReportPieChart(dataSend));
      enqueueSnackbar("Báo cáo theo tuần thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      onClose();
    } else {
      enqueueSnackbar("Vui lòng chọn tuần để báo cáo", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
  };
  const handleChangeProvince = async (e) => {
    setSelected(e.target.value);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();
  useEffect(() => {
    function weekCount(year, month_number, startDayOfWeek) {
      var firstDayOfWeek = startDayOfWeek === 0 ? 1 : startDayOfWeek || 0;

      var firstOfMonth = new Date(year, month_number - 1, 1);
      var lastOfMonth = new Date(year, month_number, 0);
      var numberOfDaysInMonth = lastOfMonth.getDate();
      console.log("firstweekday", firstOfMonth.getDay());
      var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
      console.log(firstOfMonth.getDay() - firstDayOfWeek + 7);
      console.log(6 % 7);
      var used = firstWeekDay + numberOfDaysInMonth;
      console.log("firstDayOfWeek", firstDayOfWeek);
      console.log("firstOfMonth", firstOfMonth);
      console.log("lastOfMonth", lastOfMonth);
      console.log("numberOfDaysInMonth", numberOfDaysInMonth);
      console.log("firstWeekDay", firstWeekDay);
      console.log("used", used);
      var startDate = new Date(firstOfMonth);
      var endDate = new Date(firstOfMonth);
      var temp = [];

      for (let i = 0; i < Math.ceil(used / 7); i++) {
        var temp2 = new Date();
        var temp3 = new Date();
        var startDateLW = new Date();
        var endDateLW = new Date();
        if (
          startDate.toLocaleDateString("en-us", { weekday: "long" }) ===
          "Sunday"
        ) {
          startDate.setDate(startDate.getDate() - startDate.getDay() - 6);
          endDate.setDate(endDate.getDate() - endDate.getDay());
          endDate.setHours(23, 59, 59, 0);
          temp2 = new Date(endDate);
          temp3 = new Date(endDate);
          temp3.setDate(endDate.getDate() - endDate.getDay() - 6);
          temp3.setHours(0, 0, 0, 0);
          startDateLW = new Date(temp3);
          endDateLW = new Date(temp3);
          startDateLW.setDate(startDateLW.getDate() - 7);
          endDateLW.setDate(endDateLW.getDate() - 1);
          endDateLW.setHours(23, 59, 59, 0);
        } else {
          startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
          endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
          endDate.setHours(23, 59, 59, 0);
          temp2 = new Date(endDate);
          temp3 = new Date(endDate);
          temp3.setDate(endDate.getDate() - endDate.getDay() - 6);
          temp3.setHours(0, 0, 0, 0);
          startDateLW = new Date(temp3);
          endDateLW = new Date(temp3);
          startDateLW.setDate(startDateLW.getDate() - 7);
          endDateLW.setDate(endDateLW.getDate() - 1);
          endDateLW.setHours(23, 59, 59, 0);
        }
        temp.push({
          startDate: temp3,
          endDate: temp2,
          startDateLW: startDateLW,
          endDateLW: endDateLW,
        });
        console.log("abc", startDateLW, endDateLW);
        console.log(temp3, temp2);
      }
      setData(temp);
      setLoading(false);
    }
    var now = new Date();
    // var now = new Date("2021-10-1");
    now.setDate(1);
    console.log(now);
    var month = now.getMonth() + 1;
    var day = now.getDay();
    var year = now.getFullYear();
    console.log(day, month, year);
    weekCount(year, month, day);
  }, []);
  const now = new Date();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="xs"
    >
      {loading ? (
        <Box sx={{width: '350px', height: '143px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container className={classes.root} sx={{width: 350}}>
          <Grid item xs={12} sx={center}>
            <Typography className={classes.title}>
              Chọn tuần cần báo cáo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            <MyFormControl sx={{ width: "100%" }}>
              <InputLabel id="week-select-label">Tuần</InputLabel>
              <Select
                labelId="week-select-label"
                id="week-simple-select"
                // defaultValue={province}
                label="Tuần"
                onChange={handleChangeProvince}
              >
                {data.map((value, key) => (
                  <MenuItem
                    value={value}
                    key={key}
                    disabled={
                      Date.parse(value.startDate) > Date.parse(now)
                        ? true
                        : false
                    }
                  >
                    Tuần {key + 1} : từ {format(value.startDate, "dd-MM-yyyy")}{" "}
                    đến {format(value.endDate, "dd-MM-yyyy")}
                  </MenuItem>
                ))}
              </Select>
            </MyFormControl>
            <Divider sx={{ mt: 0.5, mb: 0.5 }} />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row" className={classes.center}>
              <Button variant="outlined" color="error" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Xác nhận
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

export default WeeklyForm;
