import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { editCloth} from "../../../redux/Action";
import ImageMagnify from "./ImageMagnify";
import { LOCAL_PATH } from "../../../constants/Constants";
import { format } from "date-fns";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  img: {
    width: 300,
    height: 300,
  },
  btngroup: {
    float: "right",
    marginTop: 20,
  },
  image: {
    margin: "30px 10px 10px 10px",
  },
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
  sliderBox: {
    margin: "0px 50px 0px 7px !important",
  },
  detailBox: {
    padding: "0px 20px",
  },
  marginLeft: {
    margin: "0px 0px 0px 9px",
  },
  box: {
    margin: "0px 4px",
  },
}));

function DetailForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, userid } = props;

  const [imgUpload, setImgUpload] = useState("./images/loadingImg.gif");

  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clothName, setClothName] = useState("");
  const getParamsName = (event) => {
    setName(event.target.value);
  };
  const getParamsUserId = (event) => {
    setUserId(event.target.value);
  };
  const getParamsMaterial = (event) => {
    setMaterial(event.target.value);
  };
  const getParamsQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const getParamsType = (event) => {
    setType(event.target.value);
  };
  const [loading, setLoading] = useState(true);
  const [clothType, setClothType] = useState([]);
  const renderClothType = () => {
    return clothType.map((value, key) => (
      <MenuItem value={value.id} key={key}>
        {value.ct_name}
      </MenuItem>
    ));
  };
  const [data, setData] = useState([]) 
  const [loading2, setLoading2] = useState(true)
  useEffect(() => {
    async function getDetailProduct() {
      const { data } = await axios.get(`/getDetailCloth.${id}`);
      setData(data[0])
      setName(`${data[0].cloth_name}`);
      setQuantity(`${data[0].cloth_quantity}`);
      setUserId(`${data[0].cloth_userid}`);
      setMaterial(`${data[0].cloth_material}`);
      setType(`${data[0].cloth_typeid}`);
      setUserName(`${data[0].user_username}`);
      setFirstName(`${data[0].user_firstname}`);
      setLastName(`${data[0].user_lastname}`);
      setClothName(`${data[0].ct_name}`);
      setImgUpload(LOCAL_PATH + `${data[0].cloth_image.substring(2)}`);
      setLoading2(false)
    }
    async function getClothType() {
      const { data } = await axios.get("/getClothTypeData");
      setClothType(data);
      setLoading(false);
    }
    getDetailProduct();
    getClothType();
  }, [id]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", parseInt(id));
    formData.append("cloth_material", material);
    formData.append("cloth_name", name);
    formData.append("cloth_quantity", quantity);
    formData.append("cloth_userid", userId);
    formData.append("cloth_typeid", type);
    formData.append("ct_name", clothName);
    formData.append("user_username", userName);
    formData.append("user_firstname", firstName);
    formData.append("user_lastname", lastName);
    formData.append("cloth_old_name", data.cloth_name);
    formData.append("cloth_old_quantity", data.cloth_quantity);
    formData.append("cloth_old_typeid", data.cloth_typeid);
    const now = new Date();
    formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
    formData.append("log_userid", userid);
    formData.append("log_eventtypeid", "ECF");

    if (!type) {
      enqueueSnackbar("Vui lòng chọn loại vải", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!name || !quantity || !userId || !type) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    enqueueSnackbar("Cập nhật thông tin thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    dispatch(editCloth(formData));
    onClose();
  };
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        <Grid item xs={4}>
          <ImageMagnify img={imgUpload}></ImageMagnify>
        </Grid>
        <Grid item xs={8} className={classes.detailBox}>
          {loading || loading2 ? (
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
              <Grid container spacing={1} className={classes.box}>
                <Grid item xs={8}>
                  <FormControl style={{ width: "50%" }}>
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
                      {renderClothType()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="account"
                    label="Tài khoản"
                    placeholder="Nhập user id"
                    margin="normal"
                    onChange={getParamsUserId}
                    defaultValue={userName}
                    size="small"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="product_code"
                    label="Thành phẩn vải"
                    placeholder="Nhập thành phẩn vải"
                    margin="normal"
                    fullWidth
                    disabled
                    onChange={getParamsMaterial}
                    defaultValue={material}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    id="product_name"
                    label="Tên sản phẩm"
                    placeholder="Nhập tên sản phẩm"
                    margin="normal"
                    fullWidth
                    size="small"
                    onChange={getParamsName}
                    defaultValue={name}
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
                    defaultValue={quantity}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <ButtonGroup className={classes.btngroup}>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Cập nhật thông tin
              </Button>
              <Button variant="outlined" color="error" onClick={onClose}>
                Hủy bỏ
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
