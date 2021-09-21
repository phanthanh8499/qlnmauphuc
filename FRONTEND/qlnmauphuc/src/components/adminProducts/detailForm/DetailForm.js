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
import { editProduct } from "../../../redux/Action";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDetailProduct() {
      const { data } = await axios.get(`/getDetailProduct.${id}`);
      if (`${data[0].product_thickness}` === "Mỏng") {
        setThickness(0);
      } else if (`${data[0].product_thickness}` === "Vừa") {
        setThickness(50);
      } else {
        setThickness(100);
      }
      if (`${data[0].product_softness}` === "Mềm") {
        setSoftness(0);
      } else if (`${data[0].product_softness}` === "Vừa") {
        setSoftness(50);
      } else {
        setSoftness(100);
      }
      if (`${data[0].product_elasticity}` === "Không") {
        setElasticity(0);
      } else if (`${data[0].product_elasticity}` === "Vừa") {
        setElasticity(50);
      } else {
        setElasticity(100);
      }
      setName(`${data[0].product_name}`);
      setSize(`${data[0].product_size}`);
      setCode(`${data[0].product_code}`);
      setType(`${data[0].product_typeid}`);
      setPrice(`${data[0].product_price}`);
      setColor(`${data[0].product_color}`);
      setMaterial(`${data[0].product_material}`);
      setLining(`${data[0].product_lining}`);
      setImgUpload1(`${data[0].product_image1}`);
      setImgUpload2(`${data[0].product_image2}`);
      setImgUpload3(`${data[0].product_image3}`);
      setImgUpload4(`${data[0].product_sizeimage}`);
      setIntroduction1(`${data[0].product_introduction1}`);
      setIntroduction2(`${data[0].product_introduction2}`);
      setIntroduction3(`${data[0].product_introduction3}`);
      setIntroduction4(`${data[0].product_introduction4}`);
      setIntroduction5(`${data[0].product_introduction5}`);
      setLoading(false);
    };
    getDetailProduct();
  }, [])
  const handleSubmit = () => {
    let thicknessValue = "";
    let softnessValue = "";
    let elasticityValue = "";
    if (thickness === 0) {
      thicknessValue = "Mỏng";
    } else if (thickness === 50) {
      thicknessValue = "Vừa";
    } else {
      thicknessValue = "Dày";
    }
    if (softness === 0) {
      softnessValue = "Mềm";
    } else if (softness === 50) {
      softnessValue = "Vừa";
    } else {
      softnessValue = "Cứng";
    }
    if (elasticity === 0) {
      elasticityValue = "Không";
    } else if (elasticity === 50) {
      elasticityValue = "Vừa";
    } else {
      elasticityValue = "Có";
    }
    const formData = new FormData();
    formData.append("id", parseInt(id));
    formData.append("product_code", code);
    formData.append("product_name", name);
    formData.append("product_price", price);
    formData.append("product_typeid", type);
    formData.append("product_size", size);
    formData.append("product_color", color);
    formData.append("product_material", material);
    formData.append("product_lining", lining);
    formData.append("product_thickness", thicknessValue);
    formData.append("product_softness", softnessValue);
    formData.append("product_elasticity", elasticityValue);
    formData.append("product_introduction1", introduction1);
    formData.append("product_introduction2", introduction2);
    formData.append("product_introduction3", introduction3);
    formData.append("product_introduction4", introduction4);
    formData.append("product_introduction5", introduction5);
    const abc = {};
    formData.forEach((value, key) => (abc[key] = value));
    // Log the data.
    if (
      !code ||
      !name ||
      !type ||
      !price ||
      !color ||
      !material ||
      !lining ||
      !introduction1 ||
      !introduction2 ||
      !introduction3 ||
      !introduction4 ||
      !introduction5
    ) {
      enqueueSnackbar("Hãy điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("Chỉnh sửa thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      dispatch(editProduct(formData));
      onClose();
    } 
      
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
          {loading ? (
            <img src="./images/loading.gif" alt="loading" />
          ) : (
            <>
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
                    defaultValue={name}
                    margin="normal"
                    fullWidth
                    onChange={getParamName}
                    size="small"
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
                    defaultValue={code}
                    margin="normal"
                    fullWidth
                    disabled
                    size="small"
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
                    defaultValue={price}
                    onChange={getParamPrice}
                    size="small"
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
                    defaultValue={color}
                    margin="normal"
                    fullWidth
                    onChange={getParamColor}
                    size="small"
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
                    defaultValue={material}
                    margin="normal"
                    fullWidth
                    onChange={getParamMaterial}
                    size="small"
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
                    defaultValue={lining}
                    margin="normal"
                    fullWidth
                    onChange={getParamLining}
                    size="small"
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
                    defaultValue={size}
                    margin="normal"
                    fullWidth
                    onChange={getParamSize}
                    size="small"
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
                    defaultValue={thickness}
                    aria-labelledby="Restricted values"
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
                    defaultValue={softness}
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
                    defaultValue={elasticity}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={markElasticity}
                    onChange={getParamElasticity}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} className={classes.box}>
                <Grid item xs={6}>
                  <TextField
                    id="product_introduction1"
                    label="Giới thiệu sản phẩm 1"
                    placeholder="Placeholder"
                    defaultValue={introduction1}
                    margin="normal"
                    fullWidth
                    onChange={getParamIntroduction1}
                    size="small"
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
                    defaultValue={introduction2}
                    margin="normal"
                    fullWidth
                    onChange={getParamIntroduction2}
                    size="small"
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
                    defaultValue={introduction3}
                    margin="normal"
                    fullWidth
                    onChange={getParamIntroduction3}
                    size="small"
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
                    defaultValue={introduction4}
                    margin="normal"
                    fullWidth
                    onChange={getParamIntroduction4}
                    size="small"
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
                    defaultValue={introduction5}
                    margin="normal"
                    fullWidth
                    onChange={getParamIntroduction5}
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
