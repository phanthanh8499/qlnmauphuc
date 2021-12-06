import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch } from "react-redux";
import { FRONTEND_URL } from "../../../constants/Constants";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { addGiftVoucher } from "../../../redux/Action";
import { format } from "date-fns";
import { MyFormControl, MyTextField } from "../../utility/Utility";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  detailBox: {
    padding: "0px 0px",
  },
  btngroup: {
    float: "right",
  },
  avatar: {
    width: "207px !important",
    height: "207px !important",
    // borderRadius: "50%",
  },
  avatarItem: {
    justifyItems: "center",
    alignItems: "center",
    display: "flex",
  },
  input: {
    display: "none",
  },
  title: {
    fontSize: "20px !important",
    fontWeight: "500 !important",
    color: "#1976d2",
  },
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
};

function AddForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id, userid } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [imgUpload, setImgUpload] = useState();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    getProvinceData();
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImgUpload(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleChangeProvince = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(`/getDistrict.${e.target.value}`);
    setDistrictData(data);
    setWardData([]);
    setDistrict();
    setWard();
  };
  const handleChangeDistrict = async (e) => {
    setDistrict(e.target.value);
    const { data } = await axios.get(`/getWard.${province}&${e.target.value}`);
    setWardData(data);
    setWard();
  };
  const handleChangeWard = (e) => {
    setWard(e.target.value);
  };

  const renderAddressForm = () => {
    return (
      <>
        <Grid item xs={4} sx={{ marginTop: "0px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="province-select-label">Tỉnh/Thành</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-simple-select"
              defaultValue={province}
              label="Tỉnh/Thành"
              onChange={handleChangeProvince}
            >
              {provinceData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.province_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "0px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-simple-select"
              defaultValue={district}
              label="Quận/Huyện"
              onChange={handleChangeDistrict}
            >
              {districtData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.district_prefix} {value.district_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "0px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="ward-select-label">Xã/Phường</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-simple-select"
              defaultValue={ward}
              label="Xã/Phường"
              onChange={handleChangeWard}
            >
              {wardData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.ward_prefix} {value.ward_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
      </>
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const now = new Date();

    if (
      Date.parse(endDate) <
      Date.parse(new Date(new Date()))
    ) {
      enqueueSnackbar("Không được chọn ngày nhỏ hơn ngày hiện tại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }

    formData.append("gv_qty", qty);
    formData.append("gv_discription", `Voucher giảm giá ${voucher}%`);
    formData.append("gv_discount", voucher);
    formData.append("gv_creationdate", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("gv_expirationdate", format(endDate, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_userid", userid);
    formData.append("log_eventtypeid", "ACA");
    for(let i=0; i<qty; i++){
      dispatch(addGiftVoucher(formData));
    }
    enqueueSnackbar("Thêm voucher thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
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

  const [voucher, setVoucher] = useState(10);
  const handleChangeVoucher = (e) => {
    setVoucher(e.target.value);
  };

  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0))
  );

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const [qty, setQty] = useState(1);
  
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
    >
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12} align="center">
          <Typography className={classes.title}>Thêm voucher</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 0.5, mb: 1 }} />
          <MyFormControl fullWidth>
            <InputLabel id="voucher-select-label">Loại voucher</InputLabel>
            <Select
              labelId="voucher-select-label"
              id="voucher-simple-select"
              defaultValue={voucher}
              label="Loại voucher"
              onChange={handleChangeVoucher}
            >
              {VOUCHERTYPES.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Ngày hết hạn"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={handleChangeEndDate}
              renderInput={(params) => (
                <TextField size="small" fullWidth  {...params} />
              )}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12}>
          <MyTextField
            id="qty"
            label="Số lượng"
            placeholder="Nhập số lượng"
            margin="normal"
            fullWidth
            value={qty}
            onChange={(e) => {
              if (e.target.value > 1) {
                setQty(parseInt(e.target.value));
              } else {
                setQty(parseInt(1));
              }
            }}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Divider sx={{mt: 0.5, mb: 0.5}}/>
        </Grid>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <ButtonGroup className={classes.btngroup}>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Xác nhận thêm
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Hủy bỏ
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddForm;
