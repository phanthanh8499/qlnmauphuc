import {
  Avatar,
  Button,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box } from "@mui/system";
import { MyFormControl, MyTextField } from "../utility/Utility";
import axios from "axios";
import { FRONTEND_URL, LOCAL_PATH } from "../../constants/Constants";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { editUserInfo } from "../../redux/Action";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "12px",
  border: "1px solid rgba(144, 202, 249, 0.46)",
  "&:hover": {
    boxShadow: "rgb(32 40 45 / 8%) 0px 2px 14px 0px",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    height: 500,
  },
  input: {
    display: "none",
  },
  avatar: {
    height: "144px !important",
    width: "144px !important",
  },
  inputAvatar: {
    borderRadius: "50%",
    padding: 8,
    border: "1px dashed rgba(145, 158, 171, 0.32)",
    "&:hover": {
      "& $placeholder": {
        zIndex: 9,
      },
    },
  },
  placeholder: {
    position: "absolute",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(22, 28, 36)",
    borderRadius: "50%",
    opacity: 0.6,
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 406,
  width: "100%",
};

export default function ProfileForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [imgUpload, setImgUpload] = useState();
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

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [tel, setTel] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const getParamFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const getParamLastName = (e) => {
    setLastName(e.target.value);
  };
  const getParamTel = (e) => {
    setTel(e.target.value);
  };
  const getParamAddress = (e) => {
    setAddress(e.target.value);
  };
  const getParamEmail = (e) => {
    setEmail(e.target.value);
  };

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    async function setState() {
      if (userInfo.user_wardid !== null) {
        const data01 = await axios.get(`/getAddress.${userInfo.user_wardid}`);
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
      setFirstName(userInfo.user_firstname);
      setLastName(userInfo.user_lastname);
      setTel(userInfo.user_tel);
      setAddress(userInfo.user_address);
      setEmail(userInfo.user_email);
      setWard(userInfo.user_wardid);
      setImgUpload(LOCAL_PATH + userInfo.user_avatar.substring(2));
      setLoading(false);
    }
    getProvinceData();
    setState();
  }, []);

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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", userInfo.id);
    formData.append("user_firstname", firstName);
    formData.append("user_lastname", lastName);
    formData.append("user_address", address);
    formData.append("user_username", userInfo.user_username);
    formData.append("user_email", email);
    formData.append("user_tel", tel);
    formData.append("user_status", userInfo.user_status);
    formData.append("user_date", userInfo.user_date);
    formData.append("user_typeid", userInfo.user_typeid);
    formData.append("user_avatar", userInfo.user_avatar);
    formData.append("ut_name", userInfo.ut_name);
    formData.append("token", userInfo.token);
    formData.append("FRONTEND_URL", FRONTEND_URL);
    if (!firstName || !lastName || !address || !email || !tel) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin cá nhân", {
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
    if (file) {
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("fileRecv", 1);
      dispatch(editUserInfo(formData));
      enqueueSnackbar("Cập nhật thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      formData.append("fileRecv", 0);
      dispatch(editUserInfo(formData));
      enqueueSnackbar("Cập nhật thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
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

  return (
    <Grid container spacing={1}>
      {loading ? (
        <>
          <Grid item xs={4}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={8} sx={center}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={4}>
            <Item>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <Box className={classes.inputAvatar}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      onChange={saveFile}
                    />
                    <label
                      htmlFor="icon-button-file"
                      className={classes.placeholder}
                    >
                      <Box
                        sx={{
                          width: 144,
                          height: 144,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <AddAPhotoIcon
                          sx={{ cursor: "pointer" }}
                        ></AddAPhotoIcon>
                        <Typography sx={{ fontSize: 12 }}>
                          Update photo
                        </Typography>
                      </Box>
                    </label>
                    <Avatar
                      alt="Travis Howard"
                      src={imgUpload}
                      className={classes.avatar}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                    {userInfo.user_lastname + " " + userInfo.user_firstname}
                  </Typography>
                  <Typography>{userInfo.ut_name}</Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Box sx={{ padding: "10px" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Thông tin cá nhân
                </Typography>
              </Box>
              <Divider
                sx={{
                  borderColor: "rgba(144, 202, 249, 0.46)",
                  marginBottom: "10px",
                }}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <MyTextField
                    id="lastname"
                    label="Họ"
                    placeholder="Nhập họ"
                    margin="normal"
                    defaultValue={lastName}
                    fullWidth
                    onChange={getParamLastName}
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
                    defaultValue={firstName}
                    fullWidth
                    onChange={getParamFirstName}
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
                    defaultValue={tel}
                    fullWidth
                    onChange={getParamTel}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={12}>
                  <MyTextField
                    id="email"
                    label="Email"
                    placeholder="Nhập email"
                    margin="normal"
                    defaultValue={email}
                    fullWidth
                    onChange={getParamEmail}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    id="address"
                    label="Địa chỉ liên lạc"
                    placeholder="Nhập đỉa chỉ liên lạc (số nhà/ tên đường)"
                    margin="normal"
                    defaultValue={address}
                    fullWidth
                    onChange={getParamAddress}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {renderAddressForm()}
                <Grid item xs={12} align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Lưu thay đổi
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </>
      )}
    </Grid>
  );
}
