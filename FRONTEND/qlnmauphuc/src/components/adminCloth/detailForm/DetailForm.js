import {
  Button,
  ButtonBase,
  ButtonGroup,
  Dialog,
  FormControl,
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
import { editCloth, editProduct } from "../../../redux/Action";
import ImageMagnify from "./ImageMagnify";

const markThickness = [
  {
    value: 0,
    label: "Mỏng",
  },
  {
    value: 50,
    label: "Vừa",
  },
  {
    value: 100,
    label: "Dày",
  },
];

const markSoftness = [
  {
    value: 0,
    label: "Mềm",
  },
  {
    value: 50,
    label: "Vừa",
  },
  {
    value: 100,
    label: "Cứng",
  },
];

const markElasticity = [
  {
    value: 0,
    label: "Không",
  },
  {
    value: 50,
    label: "Vừa",
  },
  {
    value: 100,
    label: "Có",
  },
];

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
    fontSize: "14px",
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
  const { open, onClose, id } = props;

  const [imgUpload, setImgUpload] = useState("./images/loadingImg.gif");

  const [name, setName] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [userId, setUserId] = useState("");
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
  useEffect(() => {
    async function getDetailProduct() {
      const { data } = await axios.get(`/getDetailCloth.${id}`);
       setName(`${data[0].cloth_name}`);
       setQuantity(`${data[0].cloth_quantity}`);
       setUserId(`${data[0].cloth_userid}`);
       setMaterial(`${data[0].cloth_material}`);
       setType(`${data[0].cloth_typeid}`);
       setImgUpload(`${data[0].cloth_image}`);
       setLoading(false);
    };
    getDetailProduct();
  }, [])
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", parseInt(id));
    formData.append("cloth_material", material);
    formData.append("cloth_name", name);
    formData.append("cloth_quantity", quantity);
    formData.append("cloth_userid", userId);
    formData.append("cloth_typeid", type);
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
          {loading ? (
            <img src="./images/loading.gif" alt="loading" />
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
                      <MenuItem value="CARO">Vải caro</MenuItem>
                      <MenuItem value="VPOL">Vải polyester</MenuItem>
                      <MenuItem value="HTHH">Vải hoạ tiết hình học</MenuItem>
                      <MenuItem value="VCKH">Vải khách hàng gửi</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="product_code"
                    label="Số tài khoản"
                    placeholder="Nhập user id"
                    margin="normal"
                    onChange={getParamsUserId}
                    defaultValue={userId}
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
                    disabled
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
