import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Dialog,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch } from "react-redux";
import { FRONTEND_URL } from "../../../constants/Constants";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { addUser } from "../../../redux/Action";
import { format } from "date-fns";
import { MyFormControl, MyTextField } from "../../utility/Utility";
import axios from "axios";

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
}));

function AddForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id } = props;
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
    getProvinceData()
  }, [])

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

  const handleSubmit = () => {
    const formData = new FormData();
    const today = new Date();
    formData.append("id", id+1);
    formData.append("user_firstname", firstname.trim());
    formData.append("user_password", password.trim());
    formData.append("user_lastname", lastname.trim());
    formData.append("user_address", address.trim());
    formData.append("user_username", username.trim().toLowerCase());
    formData.append("user_email", email.trim());
    formData.append("user_tel", tel.trim());
    formData.append("user_status", "active");
    formData.append("user_date", format(today, "yyyy-MM-dd HH:mm:ss"));
    formData.append("user_typeid", "KH");
    formData.append("user_avatar", "./images/avatar/user-image.jpg");
    formData.append("FRONTEND_URL", FRONTEND_URL);
    if (
      !firstname ||
      !password ||
      !lastname ||
      !address ||
      !username ||
      !email ||
      !tel
    ) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!province) {
      enqueueSnackbar("Vui lòng chọn Tỉnh/Thành", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!district) {
      enqueueSnackbar("Vui lòng chọn Quận/Huyện", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!ward) {
      enqueueSnackbar("Vui lòng chọn Xã/Phường", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    formData.append("user_wardid", ward);
    formData.append("user_isdeleted", 'false');
    if (file) {
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("fileRecv", 1);
      dispatch(addUser(formData));
      // dispatch(getUserData());
      enqueueSnackbar("Thêm người dùng thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      onClose();
    } else {
      formData.append("fileRecv", 0);
      dispatch(addUser(formData));
      // dispatch(getUserData());
      enqueueSnackbar("Thêm người dùng thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      onClose();
    }
  }
  
  
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
    >
      <Grid container className={classes.root}>
        <Grid item xs={3} className={classes.avatarItem}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={saveFile}
                />
                <label htmlFor="icon-button-file">
                  <CameraAltIcon sx={{ cursor: "pointer" }}></CameraAltIcon>
                </label>
              </>
            }
          >
            <Avatar
              alt="Travis Howard"
              src={imgUpload}
              className={classes.avatar}
            />
          </Badge>
        </Grid>

        <Grid item xs={9} className={classes.detailBox}>
          <Grid spacing={1} container>
            <Grid item xs={6}>
              <MyTextField
                id="username"
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                margin="normal"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                margin="normal"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="lastname"
                label="Họ"
                placeholder="Nhập họ"
                margin="normal"
                fullWidth
                onChange={(e) => setLastname(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="firstname"
                label="Tên"
                placeholder="Nhập tên"
                margin="normal"
                fullWidth
                onChange={(e) => setFirstname(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="tel"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                margin="normal"
                fullWidth
                onChange={(e) => setTel(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="email"
                label="Email"
                placeholder="Nhập email"
                margin="normal"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MyTextField
                id="address"
                label="Địa chỉ"
                placeholder="Nhập số nhà/ tên đường"
                margin="normal"
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {renderAddressForm()}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{mt: 1}}>
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
