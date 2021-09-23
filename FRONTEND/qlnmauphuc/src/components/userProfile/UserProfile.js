import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CardActionArea,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import path from "path";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

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
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [tel, setTel] = useState();
  const [address, setAddress] = useState();
  const [company, setEmail] = useState();
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
  const handleSubmit = () => {
    if(file){
      console.log("co file");
    } else {
      console.log("khong file");
    }
  }
  console.log(path);
  return (
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
                <CameraAltIcon
                  sx={{ cursor: 'pointer' }}
                ></CameraAltIcon>
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
      <Grid item xs={9}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="lastname"
              label="Họ"
              placeholder="Placeholder"
              margin="normal"
              defaultValue="{lastName}"
              fullWidth
              onChange={getParamLastName}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <TextField
              id="firstname"
              label="Tên"
              placeholder="Placeholder"
              margin="normal"
              defaultValue="{firstName}"
              fullWidth
              onChange={getParamFirstName}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {" "}
            <TextField
              id="tel"
              label="Số điện thoại"
              placeholder="Placeholder"
              margin="normal"
              defaultValue="{tel}"
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
              defaultValue="{address}"
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
              defaultValue="{email}"
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
        >
          Lưu thay đổi
        </Button>
      </Grid>
    </Grid>
  );
}
