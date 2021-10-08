import {
  Avatar,
  Badge,
  Button,
  ButtonBase,
  ButtonGroup,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ProductImageGallery from "./ProductImageGallery";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { editCloth, editProduct, editUser } from "../../../redux/Action";
import ImageMagnify from "./ImageMagnify";
import { FRONTEND_URL, LOCAL_PATH } from "../../../constants/Constants";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IOSSwitch } from "../../utility/Utility";

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
  const { open, onClose, id } = props;

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
  const [clothType, setClothType] = useState([]);
  const renderClothType = () => {
    return clothType.map((value, key) => (
      <MenuItem value={value.id} key={key}>
        {value.ct_name}
      </MenuItem>
    ));
  };

  useEffect(() => {
    async function getDetailUser() {
      const { data } = await axios.get(`/getDetailUser.${id}`);
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
      setLoading(false);
    }
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
    if(status === "active"){
      setStatus("block");
    } else {
      setStatus("active");
    }
  }

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
                  <TextField
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
                  <TextField
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
                  <TextField
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
                  <TextField
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
                  <TextField
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
                  <TextField
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
