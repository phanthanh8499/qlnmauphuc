import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Items from "./Items";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { BpRadio } from "../utility/RadioTheme";

const useStyles = makeStyles((theme) => ({
  circleBox: {
    cursor: "pointer",
    border: "2px solid transparent",
    display: "inline-block",
    borderRadius: "100%",
    height: 30,
    width: 30,
    padding: 2,
    margin: 3,
    "&:hover": {
      border: "2px solid #0000001f ",
    },
  },
  circleBoxActive: {
    cursor: "pointer",
    border: "2px solid #0000006b",
    display: "inline-block",
    borderRadius: "100%",
    height: 30,
    width: 30,
    padding: 2,
    margin: 3,
  },
  circle: {
    border: "1px solid #e6e6e6",
  },
}));

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}
function valuetext(value) {
  return `${value}°C`;
}

let beforeChange = null;

const THICKNESS = [
  { label: "Tất cả", value: "All" },
  { label: "Mỏng", value: "Mỏng" },
  { label: "Vừa", value: "Vừa" },
  { label: "Dày", value: "Dày" },
];
const ELASTICITY = [
  { label: "Tất cả", value: "All" },
  { label: "Không", value: "Không" },
  { label: "Vừa", value: "Vừa" },
  { label: "Có", value: "Có" },
];
const SOFTNESS = [
  { label: "Tất cả", value: "All" },
  { label: "Mềm", value: "Mềm" },
  { label: "Vừa", value: "Vừa" },
  { label: "Cứng", value: "Cứng" },
];

const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function ProductCategory() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [dataRender, setDataRender] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  const [productType, setProductType] = useState([]);
  let { id } = useParams();
  let { name, type, colors } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.substring(1, 7) === "search") {
      async function getData() {
        const { data } = await axios.get(
          `/livesearch&name=${name}&type=${type}&color=${colors}`
        );
        setDataRender(data);
        setDataBackup(data);
        setLoading(false);
      }
      getData();
    } else {
      async function getProductType() {
        const { data } = await axios.get(`/getProductTypeData`);
        setProductType(data.filter((item) => item.id === id));
      }
      async function getData() {
        const { data } = await axios.get(`/getProductCategoryData.${id}`);
        setDataRender(data);
        setDataBackup(data);
        setLoading(false);
      }
      getProductType();
      getData();
    }
  }, [id, pathname, name, type, colors]);

  const [open, setOpen] = useState([true, true, false, false, false, true]);
  const handleClick = (e, index) => {
    const list = [...open];
    list[index] = !open[index];
    setOpen(list);
  };

  const [color, setColor] = useState([
    { name: "Xanh", isChecked: false, value: "#7dbdf0" },
    { name: "Đỏ", isChecked: false, value: "#a52a22" },
    { name: "Hồng", isChecked: false, value: "#eb9ec6" },
    { name: "Vàng", isChecked: false, value: "#e1df75" },
    { name: "Xám", isChecked: false, value: "#e6e6e6" },
    { name: "Đen", isChecked: false, value: "#0e1c22" },
    { name: "Tím", isChecked: false, value: "#cc3dd7" },
    { name: "Xanh den", isChecked: false, value: "#3b3a75" },
    { name: "Trắng", isChecked: false, value: "#ffffff" },
  ]);

  const handleSelectColor = (e, index) => {
    const list = [...color];
    list[index].isChecked = !list[index].isChecked;
    setColor(list);
  };

  const [value, setValue] = useState([0, 3000000]);

  const handleChange = (event, newValue) => {
    if (!beforeChange) {
      beforeChange = [...value];
    }

    setValue(newValue);
  };

  const handleChangeCommitted = () => {
    beforeChange = null;
  };

  const [cloth, setCloth] = useState([
    { name: "Polyester", value: false },
    { name: "Cotton", value: false },
    { name: "Viscose", value: false },
    { name: "Spandex", value: false },
  ]);

  const handleSelectCloth = (e, index) => {
    const list = [...cloth];
    list[index].value = !list[index].value;
    setCloth(list);
  };

  const [thickness, setThickness] = useState(THICKNESS[0].value);
  const [softness, setSoftness] = useState(SOFTNESS[0].value);
  const [elasticity, setElasticity] = useState(ELASTICITY[0].value);
  useEffect(() => {
    const removeAccents = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    };
    var temp = [...dataBackup];
    setDataRender(temp);
    var clothSelected = [];

    for (let i = 0; i < cloth.length; i++) {
      if (cloth[i].value === true) {
        clothSelected.push(cloth[i]);
      }
    }
    if (clothSelected.length >= 1) {
      for (let i = 0; i < clothSelected.length; i++) {
        temp = temp.filter((data) => {
          return removeAccents(data.product_material)
            .toLowerCase()
            .includes(removeAccents(clothSelected[i].name).toLowerCase());
        });
      }
    }

    var colorSelected = [];
    for (let i = 0; i < color.length; i++) {
      if (color[i].isChecked === true) {
        colorSelected.push(color[i]);
      }
    }
    if (colorSelected.length >= 1) {
      for (let i = 0; i < colorSelected.length; i++) {
        temp = temp.filter((data) => {
          return removeAccents(data.product_color)
            .toLowerCase()
            .includes(removeAccents(colorSelected[i].name).toLowerCase());
        });
      }
    }
    if (thickness !== "All") {
      temp = temp.filter((item) => item.product_thickness === thickness);
    }
    if (softness !== "All") {
      temp = temp.filter((item) => item.product_softness === softness);
    }
    if (elasticity !== "All") {
      temp = temp.filter((item) => item.product_elasticity === elasticity);
    }
    temp = temp.filter(
      (item) => item.product_price >= value[0] && item.product_price <= value[1]
    );
    setDataRender(temp);
  }, [color, value, cloth, thickness, softness, elasticity, dataBackup]);

  const renderTitle = () => {
    if (name) {
      return (
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Kết quả tìm kiếm của từ khoá: {name} - Loại sản phẩm: {type} - Màu sắc: {colors}
        </Typography>
      );
    } else if (id === "ALL") {
      return (
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Thời trang
        </Typography>
      );
    } else if (id === "FFM") {
      return (
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Thời trang nam
        </Typography>
      );
    } else if (id === "FFF") {
      return (
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Thời trang nữ
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          {productType[0].pt_name}
        </Typography>
      );
    }
  };
  return (
    <Grid container>
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: "##fefcfc",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          padding: "10px 5px 10px 20px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Vật liệu
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 0)}
              >
                {open[0] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[0] ? (
              <>
                <FormGroup>
                  {cloth.map((item, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.value === false ? false : true}
                          onChange={(e) => handleSelectCloth(e, index)}
                          value={item.name}
                        />
                      }
                      label={item.name}
                      key={index}
                    />
                  ))}
                </FormGroup>
              </>
            ) : null}
          </Grid>
          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Màu sắc
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 1)}
              >
                {open[1] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[1] ? (
              <>
                {color.map((item, key) => (
                  <Box
                    className={
                      item.isChecked === false
                        ? classes.circleBox
                        : classes.circleBoxActive
                    }
                    key={key}
                    onClick={(e) => handleSelectColor(e, key)}
                  >
                    <Box
                      sx={{
                        height: 22,
                        width: 22,
                        borderRadius: "100%",
                        backgroundColor: `${item.value}`,
                        border: "1px solid #e6e6e6",
                      }}
                      // className={classes.circle}
                    ></Box>
                  </Box>
                ))}
              </>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Độ dày
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 2)}
              >
                {open[2] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[2] ? (
              <>
                <RadioGroup
                  defaultValue={THICKNESS[0].value}
                  name="thickness-radios"
                >
                  {THICKNESS.map((item, key) => (
                    <FormControlLabel
                      value={item.value}
                      control={<BpRadio />}
                      label={item.label}
                      onClick={(e) => setThickness(e.target.value)}
                    />
                  ))}
                </RadioGroup>
              </>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Độ mềm
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 3)}
              >
                {open[3] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[3] ? (
              <>
                <RadioGroup
                  defaultValue={SOFTNESS[0].value}
                  name="softness-radios"
                >
                  {SOFTNESS.map((item, key) => (
                    <FormControlLabel
                      value={item.value}
                      control={<BpRadio />}
                      label={item.label}
                      onClick={(e) => setSoftness(e.target.value)}
                    />
                  ))}
                </RadioGroup>
              </>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Độ co giãn
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 4)}
              >
                {open[4] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[4] ? (
              <>
                <RadioGroup
                  defaultValue={ELASTICITY[0].value}
                  name="elasticity-radios"
                >
                  {ELASTICITY.map((item, key) => (
                    <FormControlLabel
                      value={item.value}
                      control={<BpRadio />}
                      label={item.label}
                      onClick={(e) => setElasticity(e.target.value)}
                    />
                  ))}
                </RadioGroup>
              </>
            ) : null}
          </Grid>

          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  width: "80%",
                  fontSize: "16px",
                  fontFamily: "Muli,Arial,Helvetica,sans-serif!important",
                  fontWeight: 600,
                }}
              >
                Giá tiền
              </Typography>
              <IconButton
                sx={{ float: "right", p: 0 }}
                onClick={(e) => handleClick(e, 5)}
              >
                {open[5] ? <AddIcon /> : <RemoveIcon />}
              </IconButton>
            </Box>
            {open[5] ? (
              <>
                <AirbnbSlider
                  components={{ Thumb: AirbnbThumbComponent }}
                  getAriaLabel={(index) =>
                    index === 0 ? "Minimum price" : "Maximum price"
                  }
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  defaultValue={value}
                  onChange={handleChange}
                  onChangeCommitted={handleChangeCommitted}
                  min={0}
                  max={3000000}
                  sx={{ mt: 4.5, mb: 1, width: "95%" }}
                />
                <Typography sx={{ fontSize: 14 }}>
                  Từ: {Intl.NumberFormat(["ban", "id"]).format(value[0])}đ -{" "}
                  {Intl.NumberFormat(["ban", "id"]).format(value[1])}đ
                </Typography>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      {loading ? (
        <Grid item xs={10} sx={center}>
          <CircularProgress></CircularProgress>
        </Grid>
      ) : (
        <Grid item xs={10}>
          <Box sx={{ pr: 2, pl: 2, mt: 1, width: "60%" }}>
            {renderTitle()}

            <Divider />
          </Box>
          <Items data={dataRender} />
        </Grid>
      )}
    </Grid>
  );
}
