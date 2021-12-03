import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { editUser } from "../../../redux/Action";
import { FRONTEND_URL, LOCAL_PATH } from "../../../constants/Constants";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IOSSwitch, MyFormControl, MyTextField } from "../../utility/Utility";
import { format } from "date-fns";

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

function DetailForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, userid } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();
  const [city, setCity] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgUpload, setImgUpload] = useState("");

  const [loading, setLoading] = useState(true);

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [data, setData] = useState()
  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    async function getDetailUser() {
      const { data } = await axios.get(`/getDetailUser.${id}`);
      setData(data[0])
      if (data[0].user_wardid !== null) {
        const data01 = await axios.get(`/getAddress.${data[0].user_wardid}`);
        const data02 = await axios.get(
          `/getDistrict.${data01.data[0].ward_provinceid}`
        );
        const data03 = await axios.get(
          `/getWard.${data01.data[0].ward_provinceid}&${data01.data[0].ward_districtid}`
        );
        setDistrict(data01.data[0].ward_districtid);
        setProvince(data01.data[0].ward_provinceid);
        setDistrictData(data02.data);
        setWardData(data03.data);
      }
      setUsername(`${data[0].user_username}`);
      setPassword(`${data[0].user_password}`);
      setEmail(`${data[0].user_email}`);
      setTel(`${data[0].user_tel}`);
      setAddress(`${data[0].user_address}`);
      setFirstname(`${data[0].user_firstname}`);
      setLastname(`${data[0].user_lastname}`);
      setType(`${data[0].user_typeid}`);
      setStatus(`${data[0].user_status}`);
      setDate(`${data[0].user_date}`);
      setImgUpload(LOCAL_PATH + `${data[0].user_avatar.substring(2)}`);
      setAvatar(`${data[0].user_avatar}`);
      setCity(`${data[0].user_city}`);
      setWard(`${data[0].user_wardid}`);
      setLoading(false);
    }
    getProvinceData();
    getDetailUser();
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

  const handleChangeSwitch = (e) => {
    if (status === "active") {
      setStatus("block");
    } else {
      setStatus("active");
    }
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
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
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
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
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
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
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
    formData.append("id", id);
    formData.append("user_firstname", firstname.trim());
    formData.append("user_lastname", lastname.trim());
    formData.append("user_address", address.trim());
    formData.append("user_username", username.trim());
    formData.append("user_email", email.trim());
    formData.append("user_tel", tel.trim());
    formData.append("user_status", status.trim());
    formData.append("user_typeid", type.trim());
    formData.append("user_date", date.trim());
    formData.append("user_avatar", avatar.trim());
    formData.append("user_city", city.trim());
    formData.append("FRONTEND_URL", FRONTEND_URL);
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
    formData.append("user_wardid", parseInt(ward));

    formData.append("uld_old_firstname", data.user_firstname);
    formData.append("uld_old_lastname", data.user_lastname);
    formData.append("uld_old_address", data.user_address);
    formData.append("uld_old_email", data.user_email);
    formData.append("uld_old_tel", data.user_tel);
    formData.append("uld_old_status", data.user_status);
    formData.append("uld_old_wardid", data.user_wardid);
    const now = new Date();
    formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_userid", userid);
    formData.append("log_eventtypeid", "ECA");

    if (file) {
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("fileRecv", 1);
      dispatch(editUser(formData));
      enqueueSnackbar("Cập nhật thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      formData.append("fileRecv", 0);
      dispatch(editUser(formData));
      enqueueSnackbar("Cập nhật thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="md"
    >
      <Grid container className={classes.root}>
        {loading ? (
          <Grid
            item
            xs={12}
            sx={{
              width: "900px",
              height: "376px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
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
                    defaultValue={username}
                    disabled
                    onChange={(e) => setUsername(e.target.value)}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <MyTextField
                    id="lastname"
                    label="Họ"
                    placeholder="Nhập họ"
                    margin="normal"
                    fullWidth
                    defaultValue={lastname}
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
                    defaultValue={firstname}
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
                    defaultValue={tel}
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
                    defaultValue={email}
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
                    placeholder="Nhập địa chỉ"
                    margin="normal"
                    fullWidth
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {renderAddressForm()}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      defaultChecked={status === "active"}
                      onClick={handleChangeSwitch}
                    />
                  }
                  label={status === "active" ? "Hoạt động" : "Đã khoá"}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup className={classes.btngroup}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Xác nhận sửa
                </Button>
                <Button variant="outlined" color="error" onClick={onClose}>
                  Hủy bỏ
                </Button>
              </ButtonGroup>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
