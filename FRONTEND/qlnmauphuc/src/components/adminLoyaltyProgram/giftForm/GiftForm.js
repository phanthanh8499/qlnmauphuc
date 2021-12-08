import {
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { deleteUser } from "../../../redux/Action";
import { format } from "date-fns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MyFormControl, MyTextField } from "../../utility/Utility";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "15px 15px",
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
    fontSize: "20px !important",
    fontWeight: "500 !important",
    color: "#1976d2",
  },
}));

function GiftForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id, listId, userid, dataReq } = props;
  console.log(dataReq);
  console.log(listId);
  const [voucherData, setVoucherData] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getVoucherMenu() {
      const { data } = await axios.get(`/getGiftVoucherMenu.10`);
      setVoucherData(data);
      const list = [data];
      setListVoucherData(list);
      setLoading(false);
    }
    getVoucherMenu();
  }, []);

  const handleSubmit = () => {
    const formData = new FormData();
    const now = new Date();
    formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_userid", userid);
    formData.append("log_eventtypeid", "DCA");
    formData.append("id", dataReq.id);
    formData.append("user_username", dataReq.user_username);
    formData.append("voucherList", JSON.stringify(voucherSelected) );
    formData.append("dateList", JSON.stringify(endDateSelected) );
    for(let i = 0; i<voucherSelected.length; i++){
      for (let j = i + 1; j < voucherSelected.length; j++) {
        if(voucherSelected[i].id === voucherSelected[j].id){
          enqueueSnackbar("Không được chọn voucher có cùng ID", {
            variant: "error",
            autoHideDuration: 2000,
          });
          return false;
        }
      }
    }
    for (let i = 0; i < voucherSelected.length; i++) {
      if (!voucherSelected[i].id) {
        enqueueSnackbar("Chưa chọn voucher", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      }
    }
    for(let i = 0; i<endDateSelected.length; i++){
      if (new Date(endDateSelected[i].gv_expirationdate) < new Date()) {
        enqueueSnackbar("Không được chọn ngày bé hơn ngày hiện tại", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      }
    }
    
    enqueueSnackbar("Tặng mã giảm giá thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    axios.post(`/admin/giftVoucher/giveUser`, formData);
    onClose();
  };

  const VOUCHERTYPES = [
    {
      id: 10,
      name: "Voucher giảm giá 10%",
    },
    { id: 15, name: "Voucher giảm giá 15%" },
    { id: 20, name: "Voucher giảm giá 20%" },
  ];

  const [inputList, setInputList] = useState([{ id: 1 }]);
  const [listVoucherData, setListVoucherData] = useState([
    [{ id: "1", gv_expirationdate: new Date() }],
  ]);
  const handleChangeVoucher = async (e, index) => {
    var string = e.target.value;
    const { data } = await axios.get(`/getGiftVoucherMenu.${string}`);
    const list = [...listVoucherData];
    list[index] = data;
    setListVoucherData(list);
  };

  const [voucherSelected, setVoucherSelected] = useState([{ id: "" }]);

  const [endDateSelected, setEndDateSelected] = useState([
    { gv_expirationdate: new Date(new Date().setHours(23, 59, 59, 0)) },
  ]);

  const handleChangeEndDate = (newValue, index) => {
    if(newValue < new Date()){
      enqueueSnackbar("Không được chọn ngày nhỏ hơn hiện tại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    const list = [...endDateSelected];
    list[index].gv_expirationdate = format(
      new Date(new Date(newValue).setHours(23, 59, 59, 0)),
      "yyyy-MM-dd HH:mm:ss"
    );
    setEndDateSelected(list);
  };

  const handleAddClick = (e, index) => {
    setEndDateSelected([
      ...endDateSelected,
      { gv_expirationdate: new Date(new Date().setHours(23, 59, 59, 0)) },
    ]);
    setVoucherSelected([...voucherSelected, { id: "" }]);
    setListVoucherData([...listVoucherData, voucherData]);
    setInputList([...inputList, { id: index + 1 }]);
  };

  const handleRemoveClick = (index) => {
    const endDateList = [...endDateSelected];
    endDateList.splice(index, 1);
    setEndDateSelected(endDateList);
    const voucherSelectedList = [...voucherSelected];
    voucherSelectedList.splice(index, 1);
    setVoucherSelected(voucherSelectedList);
    const voucherDataList = [...listVoucherData];
    voucherDataList.splice(index, 1);
    setListVoucherData(voucherDataList);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  const handleClickSelectVoucher = (e, index) => {
    var list = [...voucherSelected];
    list[index].id = e.target.value;
    setVoucherSelected(list);
    var temp = listVoucherData[index].filter(
      (item) => item.id === e.target.value
    )[0].gv_expirationdate;
    var list2 = [...endDateSelected];
    list2[index].gv_expirationdate = format(
      new Date(new Date(temp).setHours(23, 59, 59, 0)),
      "yyyy-MM-dd HH:mm:ss"
    );
    setEndDateSelected(list2);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
    >
      {loading ? (
        <div>loading... </div>
      ) : (
        <Grid
          container
          className={classes.root}
          spacing={1}
          sx={{ width: 980 }}
        >
          <Grid item xs={12} align="center">
            <Typography className={classes.title}>Tặng voucher</Typography>
            <Divider sx={{ mt: 0.5, mb: 1 }} />
          </Grid>
          {inputList.map((item, index) => (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <MyFormControl fullWidth>
                    <InputLabel id="voucher-select-label">
                      Loại voucher
                    </InputLabel>
                    <Select
                      labelId="voucher-select-label"
                      id="voucher-simple-select"
                      defaultValue={10}
                      label="Loại voucher"
                      onChange={(e) => handleChangeVoucher(e, index)}
                    >
                      {VOUCHERTYPES.map((value, key) => (
                        <MenuItem value={value.id} key={key}>
                          {value.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </MyFormControl>
                </Grid>
                <Grid item xs={5}>
                  <MyFormControl fullWidth>
                    <InputLabel id="voucher-select-label">Voucher</InputLabel>
                    <Select
                      labelId="voucher-select-label"
                      id="voucher-simple-select"
                      label="Voucher"
                      value={voucherSelected[index].id}
                      onChange={(e) => handleClickSelectVoucher(e, index)}
                    >
                      {listVoucherData[index].map((value, key) => (
                        <MenuItem value={value.id} key={key}>
                          {value.id} -- {formatDate(value.gv_expirationdate)}
                        </MenuItem>
                      ))}
                    </Select>
                  </MyFormControl>
                </Grid>
                <Grid item xs={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={12}>
                      <DesktopDatePicker
                        label="Ngày hết hạn"
                        inputFormat="dd/MM/yyyy"
                        value={endDateSelected[index].gv_expirationdate}
                        onChange={(e) => handleChangeEndDate(e, index)}
                        renderInput={(params) => (
                          <TextField size="small" fullWidth {...params} />
                        )}
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    {inputList.length !== 1 && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveClick(index)}
                      >
                        <RemoveIcon />
                      </Button>
                    )}
                    {inputList.length - 1 === index && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => handleAddClick(e, index)}
                      >
                        <AddIcon />
                      </Button>
                    )}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12} align="right">
            <Divider sx={{ mt: 0.5, mb: 1 }} />
            <ButtonGroup className={classes.btngroup}>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Xác nhận
              </Button>
              <Button variant="outlined" color="error" onClick={onClose}>
                Hủy bỏ
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

export default GiftForm;
