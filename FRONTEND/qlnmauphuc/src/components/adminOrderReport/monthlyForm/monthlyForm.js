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
  getOrderReportCountData,
  getOrderReportPieChart,
  getOrderReportStackChart,
  getTailorsData,
  setDateData,
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

function MonthyForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose } = props;
  const handleSubmit = () => {
    if (selected) {
      const dataSend = {
        startDate: format(selected.startDate, "yyyy-MM-dd"),
        endDate: format(selected.endDate, "yyyy-MM-dd HH:mm:ss"),
        startDateLW: format(selected.startDateLW, "yyyy-MM-dd"),
        endDateLW: format(selected.endDateLW, "yyyy-MM-dd HH:mm:ss"),
        total_order: 15,
      };
      dispatch(getOrderReportCountData(dataSend));
      dispatch(getOrderReportPieChart(dataSend));
      dispatch(getOrderReportStackChart(dataSend, 15));
      dispatch(getTailorsData(dataSend, 15));
      dispatch(
        setDateData({
          startDate: selected.startDate,
          endDate: selected.endDate,
        })
      );
      enqueueSnackbar("Báo cáo theo tháng thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      onClose();
    } else {
      enqueueSnackbar("Vui lòng chọn tháng để báo cáo", {
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
    function monthCount(year) {
      var temp = [];
      for (let i = 1; i <= 12; i++) {
        var startDateLW = new Date(year, i - 2, 1);
        var endDateLW = new Date(year, i - 1, 0);
        var startDate = new Date(year, i - 1, 1);
        var endDate = new Date(year, i, 0);
        endDate.setHours(23, 59, 59, 0);
        endDateLW.setHours(23, 59, 59, 0);
        temp.push({
          startDate: startDate,
          endDate: endDate,
          startDateLW: startDateLW,
          endDateLW: endDateLW,
        });
      }
      setData(temp);
      setLoading(false);
    }
    var now = new Date();
    now.setDate(1);
    var year = now.getFullYear();
    monthCount(year);
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
        <Box
          sx={{
            width: "350px",
            height: "143px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container className={classes.root} sx={{ width: 350 }}>
          <Grid item xs={12} sx={center}>
            <Typography className={classes.title}>
              Chọn tháng cần báo cáo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            <MyFormControl sx={{ width: "100%" }}>
              <InputLabel id="month-select-label">Tháng</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-simple-select"
                // defaultValue={province}
                label="Tháng"
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
                    Tháng {key + 1} : từ {format(value.startDate, "dd/MM/yyyy")}{" "}
                    đến {format(value.endDate, "dd/MM/yyyy")}
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

export default MonthyForm;
