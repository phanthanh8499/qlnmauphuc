import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch } from "react-redux";
import { editUserInfo } from "../../redux/Action";
import { FRONTEND_URL, LOCAL_PATH } from "../../constants/Constants";
import { useSnackbar } from "notistack";
import axios from "axios";
import { MyFormControl, MyTextField } from "../utility/Utility";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  btngroup: {
    margin: 10,
    float: "right",
  },
  // input: {
  //   display: "none",
  // },
  // avatar: {
  //   width: "207px !important",
  //   height: "207px !important",
  //   // borderRadius: "50%",
  // },
  avatarItem: {
    justifyItems: "center",
    alignItems: "center",
    display: "flex",
  },
  content: {
    padding: 10,
  },

  smallLabel: {
    color: "#7f7f7f",
    fontSize: 12,
    margin: "0px 17px",
  },
  btnavatar: {
    justifyItems: "center",
    alignItems: "center",
    display: "flex",
  },
  input: {
    display: "none",
  },
  avatar: {
    height: "170px !important",
    width: "170px !important",
  },
  inputAvatar: {
    borderRadius: "50%",
    padding: 8,
    marginBottom: '60px',
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

export default function UProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [tel, setTel] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [imgUpload, setImgUpload] = useState();
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
    formData.append("token", userInfo.token);
    formData.append("FRONTEND_URL", FRONTEND_URL);
    if (!firstName || !lastName || !address || !email || !tel) {
      enqueueSnackbar("Vui l??ng ??i???n ?????y ????? th??ng tin c?? nh??n", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!province) {
      enqueueSnackbar("Vui l??ng ch???n T???nh/Th??nh", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!district) {
      enqueueSnackbar("Vui l??ng ch???n Qu???n/Huy???n", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!ward) {
      enqueueSnackbar("Vui l??ng ch???n X??/Ph?????ng", {
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
      enqueueSnackbar("C???p nh???t th??ng tin th??nh c??ng", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      formData.append("fileRecv", 0);
      dispatch(editUserInfo(formData));
      enqueueSnackbar("C???p nh???t th??ng tin th??nh c??ng", {
        variant: "success",
        autoHideDuration: 2000,
      });
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
            <InputLabel id="province-select-label">T???nh/Th??nh</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-simple-select"
              defaultValue={province}
              label="T???nh/Th??nh"
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
            <InputLabel id="district-select-label">Qu???n/Huy???n</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-simple-select"
              defaultValue={district}
              label="Qu???n/Huy???n"
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
            <InputLabel id="ward-select-label">X??/Ph?????ng</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-simple-select"
              defaultValue={ward}
              label="X??/Ph?????ng"
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
    <Grid container className={classes.content}>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            width: "100%",
            height: 256,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid
            item
            xs={3}
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
              <label htmlFor="icon-button-file" className={classes.placeholder}>
                <Box
                  sx={{
                    width: 170,
                    height: 170,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <AddAPhotoIcon sx={{ cursor: "pointer" }}></AddAPhotoIcon>
                  <Typography sx={{ fontSize: 12 }}>Update photo</Typography>
                </Box>
              </label>
              <Avatar
                alt="Travis Howard"
                src={imgUpload}
                className={classes.avatar}
              />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <MyTextField
                  id="lastname"
                  label="H???"
                  placeholder="Nh???p h???"
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
                  label="T??n"
                  placeholder="Nh???p t??n"
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
                  label="S??? ??i???n tho???i"
                  placeholder="Nh???p s??? ??i???n tho???i"
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
                  placeholder="Nh???p email"
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
                  label="?????a ch??? li??n l???c"
                  placeholder="Nh???p ?????a ch??? li??n l???c (s??? nh??/ t??n ???????ng)"
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
            </Grid>
            <Divider sx={{ marginTop: "10px" }} />
            <Button
              variant="outlined"
              color="primary"
              className={classes.btngroup}
              onClick={handleSubmit}
              sx={{ margin: "5px 0px 0px 0px" }}
            >
              L??u thay ?????i
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
