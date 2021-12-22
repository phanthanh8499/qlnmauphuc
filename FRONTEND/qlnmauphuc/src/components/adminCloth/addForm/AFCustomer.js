import {
  Button,
  ButtonGroup,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import makeStyles from "@mui/styles/makeStyles";
import {
  CAP_NHAT_HINH_ANH,
  FRONTEND_URL,
} from "../../../constants/Constants";
import { addCloth} from "../../../redux/Action";
import axios from "axios";
import { format } from "date-fns";

const useStyle = makeStyles((theme) => ({
  label: {
    color: "#00000099",
    padding: 0,
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.00938em",
    fontSize: 13,
  },
  input: {
    display: "none",
  },
  box: {
    margin: "0px 4px",
    position: "relative",
  },
  btngroup: {
    bottom: 10,
    right: 0,
    position: "absolute",
  },
  imgTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "10px !important",
  },
}));

function AFCustomer(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, userid } = props;
  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const getParamsName = (event) => {
    setName(event.target.value);
  };
  const getParamsUserId = (event) => {
    setUserId(event.target.value);
    setUserSelected(userData.filter((item) => item.id === event.target.value));
  };
  const getParamsMaterial = (event) => {
    setMaterial(event.target.value);
  };
  const getParamsQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      dispatch({ type: CAP_NHAT_HINH_ANH, payload: reader.result });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", parseInt(id+1));
    if(!material){
      formData.append("cloth_material", "Không rõ");
    } else {
      formData.append("cloth_material", material);
    }
    formData.append("cloth_name", name);
    formData.append("cloth_quantity", quantity);
    formData.append("cloth_userid", userId);
    formData.append("cloth_typeid", "VCKH");
    formData.append("ct_name", "Vải khách hàng gửi");
    formData.append("user_username", userSelected[0].user_username);
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("frontEndURL", FRONTEND_URL);
    const now = new Date();
    formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_userid", userid);
    formData.append("log_eventtypeid", "ACF");
    if (!name || !quantity) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!file) {
      enqueueSnackbar("Vui lòng import hình ảnh", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    
    enqueueSnackbar("Thêm vải thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    dispatch(addCloth(formData));
    onClose()
  };
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const renderUserList = () => {
    return userData.map((value, key) => (
      <MenuItem value={value.id} key={key}>
        {value.user_username}
      </MenuItem>
    ));
  };
  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get("/admin/users");
      setUserData(data.filter((item) => item.user_typeid === "KH"));
      setLoading(false);
    }
    getUserData();
  }, []);
  return (
    <>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            width: "682px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={8}>
            {/* <FormControl style={{ width: "50%" }}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Loại vải
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={type}
                onChange={getParamsType}
                displayEmpty
                style={{ padding: "0px !important" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {renderUserList()}
              </Select>
            </FormControl> */}
          </Grid>
          <Grid item xs={4}>
            {/* <TextField
              id="product_code"
              label="Số tài khoản"
              placeholder="Nhập user id"
              margin="normal"
              onChange={getParamsUserId}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            <FormControl style={{ width: "50%" }}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Tài khoản
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={userId}
                onChange={getParamsUserId}
                displayEmpty
                style={{ padding: "0px !important" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {renderUserList()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="product_code"
              label="Thành phẩn vải"
              placeholder="Nhập thành phẩn vải"
              margin="normal"
              fullWidth
              onChange={getParamsMaterial}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="product_name"
              label="Tên vải"
              placeholder="Nhập tên vải"
              margin="normal"
              fullWidth
              size="small"
              onChange={getParamsName}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="product_color"
              label="Số lượng"
              placeholder="Nhập số lượng"
              margin="normal"
              fullWidth
              onChange={getParamsQuantity}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.label}>Hình ảnh vải</Typography>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file1"
              type="file"
              onChange={saveFile}
            />
            <label htmlFor="icon-button-file1">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="large"
              >
                <PhotoCamera />
              </IconButton>
              {/* {fileName} */}
            </label>
            {/* <Typography className={classes.imgTitle}>{fileName1}</Typography> */}
          </Grid>
          <Grid container className={classes.box}>
            <ButtonGroup className={classes.btngroup}>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Xác nhận thêm
              </Button>
              <Button variant="outlined" color="error" onClick={onClose}>
                Hủy bỏ
              </Button>
            </ButtonGroup>
          </Grid>
        </>
      )}
    </>
  );
}

export default AFCustomer;
