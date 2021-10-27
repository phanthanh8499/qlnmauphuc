import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Dialog,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import ImageMagnify from "./ImageMagnify";
import { Box } from "@mui/system";
import AFCompany from "./AFCompany";
import AFCustomer from "./AFCustomer";
import { useDispatch } from "react-redux";
import { FRONTEND_URL, XOA_HINH_ANH } from "../../../constants/Constants";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { addUser, getUserData } from "../../../redux/Action";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AddForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({ type: XOA_HINH_ANH });
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
    formData.append("user_typeid", "NV");
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
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
              <TextField
                id="address"
                label="address"
                placeholder="Nhập địa chỉ"
                margin="normal"
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12}>
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
