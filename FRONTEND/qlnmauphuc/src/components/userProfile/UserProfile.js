import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import path from "path";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch } from "react-redux";
import { editUserInfo } from "../../redux/Action";
import { FRONTEND_ADM_URL, FRONTEND_URL } from "../../constants/Constants";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  btngroup: {
    margin: 10,
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
  content: {
    padding: 10,
  },
  input: {
    display: "none",
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
}));

export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = useState();
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
  const [loading, setLoading] = useState(true);
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    async function setState() {
      setFirstName(userInfo.user_firstname);
      setLastName(userInfo.user_lastname);
      setTel(userInfo.user_tel);
      setAddress(userInfo.user_address);
      setEmail(userInfo.user_email);
      setImgUpload("http://localhost:3000" + userInfo.user_avatar.substring(1));
      setLoading(false);
    }
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
    formData.append("FRONTEND_ADM_URL", FRONTEND_ADM_URL);
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

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          <Grid container className={classes.content}>
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
                  src={
                    imgUpload
                  }
                  className={classes.avatar}
                />
              </Badge>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    id="lastname"
                    label="Họ"
                    placeholder="Placeholder"
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
                  <TextField
                    id="firstname"
                    label="Tên"
                    placeholder="Placeholder"
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
                  <TextField
                    id="tel"
                    label="Số điện thoại"
                    placeholder="Placeholder"
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
                  <TextField
                    id="address"
                    label="Địa chỉ liên lạc"
                    placeholder="Placeholder"
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
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    placeholder="Placeholder"
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
              </Grid>
              <Divider />
              <Button
                variant="outlined"
                color="primary"
                className={classes.btngroup}
                onClick={handleSubmit}
                sx={{margin: '5px 0px 0px 0px'}}
              >
                Lưu thay đổi
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
