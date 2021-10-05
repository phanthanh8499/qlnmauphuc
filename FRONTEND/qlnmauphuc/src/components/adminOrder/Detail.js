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
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import ProductImageGallery from "./ProductImageGallery";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import makeStyles from "@mui/styles/makeStyles";

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
    label: "Dầy",
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
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "1rem",
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
    margin: "0px 50px 0px 7px",
  },
  detailBox: {
    padding: "0px 20px",
  },
  marginLeft: {
    margin: "0px 0px 0px 9px",
  },
  box: {
    margin: '0px 4px',
  },
}));

function Detail(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id } = props;

  const [imgUpload1, setImgUpload1] = useState("./images/loadingImg.gif");
  const [imgUpload2, setImgUpload2] = useState("./images/loadingImg.gif");
  const [imgUpload3, setImgUpload3] = useState("./images/loadingImg.gif");
  const [imgUpload4, setImgUpload4] = useState("./images/loadingImg.gif");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [lining, setLining] = useState("");
  const [size, setSize] = useState("");
  const [thickness, setThickness] = useState("");
  const [softness, setSoftness] = useState("");
  const [elasticity, setElasticity] = useState();
  const [type, setType] = useState("");
  const [introduction1, setIntroduction1] = useState("");
  const [introduction2, setIntroduction2] = useState("");
  const [introduction3, setIntroduction3] = useState("");
  const [introduction4, setIntroduction4] = useState("");
  const [introduction5, setIntroduction5] = useState("");
  const getParamName = (event) => {
    setName(event.target.value);
  };
  const getParamCode = (event) => {
    setCode(event.target.value);
  };
  const getParamPrice = (event) => {
    setPrice(event.target.value);
  };
  const getParamColor = (event) => {
    setColor(event.target.value);
  };
  const getParamMaterial = (event) => {
    setMaterial(event.target.value);
  };
  const getParamLining = (event) => {
    setLining(event.target.value);
  };
  const getParamSize = (event) => {
    setSize(event.target.value);
  };
  const getParamType = (event) => {
    setType(event.target.value);
  };
  const getParamIntroduction1 = (event) => {
    setIntroduction1(event.target.value);
  };
  const getParamIntroduction2 = (event) => {
    setIntroduction2(event.target.value);
  };
  const getParamIntroduction3 = (event) => {
    setIntroduction3(event.target.value);
  };
  const getParamIntroduction4 = (event) => {
    setIntroduction4(event.target.value);
  };
  const getParamIntroduction5 = (event) => {
    setIntroduction5(event.target.value);
  };
  const getParamThickness = (event, value) => {
    setThickness(value);
  };
  const getParamSoftness = (event, value) => {
    setSoftness(value);
  };
  const getParamElasticity = (event, value) => {
    setElasticity(value);
  };
  const [file1, setFile1] = useState();
  const [fileName1, setFileName1] = useState("");
  const saveFile1 = (e) => {
    setFile1(e.target.files[0]);
    setFileName1(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImgUpload1(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const [file2, setFile2] = useState();
  const [fileName2, setFileName2] = useState("");
  const saveFile2 = (e) => {
    setFile2(e.target.files[0]);
    setFileName2(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImgUpload2(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const [file3, setFile3] = useState();
  const [fileName3, setFileName3] = useState("");
  const saveFile3 = (e) => {
    setFile3(e.target.files[0]);
    setFileName3(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImgUpload3(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const [file4, setFile4] = useState();
  const [fileName4, setFileName4] = useState("");
  const saveFile4 = (e) => {
    setFile4(e.target.files[0]);
    setFileName4(e.target.files[0].name);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      setImgUpload4(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("product_code", code);
    formData.append("product_name", name);
    formData.append("product_price", price);
    formData.append("product_type", type);
    formData.append("product_color", color);
    formData.append("product_material", material);
    formData.append("product_lining", lining);
    formData.append("product_thickness", thickness);
    formData.append("product_softness", softness);
    formData.append("product_elasticity", elasticity);
    formData.append("product_introduction1", introduction1);
    formData.append("product_introduction2", introduction2);
    formData.append("product_introduction3", introduction3);
    formData.append("product_introduction4", introduction4);
    formData.append("product_introduction5", introduction5);
    formData.append("file1", file1);
    formData.append("fileName1", fileName1);
    formData.append("file2", file2);
    formData.append("fileName2", fileName2);
    formData.append("file3", file3);
    formData.append("fileName3", fileName3);
    formData.append("file4", file4);
    formData.append("fileName4", fileName4);
    console.log(formData);
  };
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        <Grid item xs={4} className={classes.imageBox}>
          <ProductImageGallery
            img1={imgUpload1}
            img2={imgUpload2}
            img3={imgUpload3}
            img4={imgUpload4}
          ></ProductImageGallery>
        </Grid>
        <Grid item xs={8} className={classes.detailBox}>
          <Grid container spacing={1} className={classes.box}>
            <Grid item xs={12}>
              <FormControl style={{ width: "30%" }}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Loại sản phẩm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={type}
                  onChange={getParamType}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="BFM">Blazer</MenuItem>
                  <MenuItem value="SFM">Suit</MenuItem>
                  <MenuItem value="TFM">Tuxedo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product_name"
                label="Tên sản phẩm"
                placeholder="Placeholder"
                defaultValue="Áo blazer dạ lông cừu nam 2 khuy phong cách Âu Mỹ"
                margin="normal"
                fullWidth
                onChange={getParamName}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="product_code"
                label="Mã sản phẩm"
                placeholder="Placeholder"
                defaultValue="AZ-6"
                margin="normal"
                fullWidth
                onChange={getParamCode}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="product_price"
                label="Giá"
                placeholder="Placeholder"
                margin="normal"
                defaultValue="10000000"
                onChange={getParamPrice}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VNĐ</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.box}>
            <Grid item xs={3}>
              <TextField
                id="product_color"
                label="Màu"
                placeholder="Placeholder"
                defaultValue="Xám, đen, đỏ rượu, xanh thanh"
                margin="normal"
                fullWidth
                onChange={getParamColor}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="product_material"
                label="Chất liệu"
                placeholder="Placeholder"
                defaultValue="70% sợi lolyester, 30% cotton"
                margin="normal"
                fullWidth
                onChange={getParamMaterial}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="product_lining"
                label="Lớp lót"
                placeholder="Placeholder"
                defaultValue="100% polyester"
                margin="normal"
                fullWidth
                onChange={getParamLining}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="product_size"
                label="Size"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamSize}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3} className={classes.sliderBox}>
              <Typography gutterBottom className={classes.label}>
                Độ mỏng
              </Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={markThickness}
                onChange={getParamThickness}
              />
            </Grid>
            <Grid item xs={3} className={classes.sliderBox}>
              <Typography gutterBottom className={classes.label}>
                Độ mềm
              </Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={markSoftness}
                onChange={getParamSoftness}
              />
            </Grid>
            <Grid item xs={3} className={classes.sliderBox}>
              <Typography gutterBottom className={classes.label}>
                Độ co giãn
              </Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={markElasticity}
                onChange={getParamElasticity}
              />
            </Grid>
          </Grid>

          <Grid container className={classes.box}>
            <Grid item xs={3}>
              <Typography className={classes.label}>
                Hình ảnh sản phẩm
              </Typography>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file1"
                type="file"
                onChange={saveFile1}
              />
              <label htmlFor="icon-button-file1">
                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                  <PhotoCamera />
                </IconButton>
                {/* {fileName1} */}
              </label>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.label}>
                Hình ảnh sản phẩm
              </Typography>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file2"
                type="file"
                onChange={saveFile2}
              />
              <label htmlFor="icon-button-file2">
                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                  <PhotoCamera />
                </IconButton>
                cccc
              </label>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.label}>
                Hình ảnh sản phẩm
              </Typography>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file3"
                type="file"
                onChange={saveFile3}
              />
              <label htmlFor="icon-button-file3">
                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                  <PhotoCamera />
                </IconButton>
                cccc
              </label>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.label}>Bảng size</Typography>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file4"
                type="file"
                onChange={saveFile4}
              />
              <label htmlFor="icon-button-file4">
                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                  <PhotoCamera />
                </IconButton>
                cccc
              </label>
            </Grid>
          </Grid>

          <Grid container className={classes.box}>
            <Grid item xs={6}>
              <TextField
                id="product_introduction1"
                label="Giới thiệu sản phẩm 1"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamIntroduction1}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product_introduction2"
                label="Giới thiệu sản phẩm 2"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamIntroduction2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product_introduction3"
                label="Giới thiệu sản phẩm 3"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamIntroduction3}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product_introduction4"
                label="Giới thiệu sản phẩm 4"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamIntroduction4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="product_introduction5"
                label="Giới thiệu sản phẩm 5"
                placeholder="Placeholder"
                defaultValue="L, M, S, XL, XXL, Yêu cầu may theo số đo"
                margin="normal"
                fullWidth
                onChange={getParamIntroduction5}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup className={classes.btngroup}>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Cập nhật thông tin
              </Button>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Hủy bỏ
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default Detail;
