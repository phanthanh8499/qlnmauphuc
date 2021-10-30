import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../../redux/Action";
import Items from "./Items";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

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

export default function ProductCategory() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const { productData } = products;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);
  const [loading, setLoading] = useState(true);
  const [dataRender, setDataRender] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  useEffect(() => {
    setDataRender(productData);
    setDataBackup(productData);
    setLoading(false);
  }, [productData]);
  const [open, setOpen] = useState([true, true, true, true]);
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

  const [colorSelected, setColorSelected] = useState([]);
  const handleSelectColor = (e, index) => {
    const list = [...color];
    list[index].isChecked = !list[index].isChecked;
    setColor(list);
  };

  const [value, setValue] = useState([0, 3000000]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    if (!beforeChange) {
      beforeChange = [...value];
    }

    setValue(newValue);
  };

  const handleChangeCommitted = () => {
    beforeChange = null;
  };

  const CLOTH = ["Polyester", "Cotton", "Viscose", "Spandex"];

  const [cloth, setCloth] = useState([
    { name: "Polyester", value: false },
    { name: "Cotton", value: false },
    { name: "Viscose", value: false },
    { name: "Spandex", value: false },
  ]);

  const [personName, setPersonName] = useState([]);
  const handleSelectCloth = (e, index) => {
    const {
      target: { value },
    } = e;
    const list = [...cloth];
    list[index].value = !list[index].value;
    setCloth(list);
  };

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
      // setDataRender(temp);
    }

    var colorSelected = [];
    for (let i = 0; i < color.length; i++) {
      if (color[i].isChecked === true) {
        colorSelected.push(color[i]);
        console.log("da chon");
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

    temp = temp.filter(
      (item) => item.product_price >= value[0] && item.product_price <= value[1]
    );

    console.log(temp);
    setDataRender(temp);
  }, [color, value, cloth]);

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
                Giá tiền
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
        <div>loading...</div>
      ) : (
        <Grid item xs={10}>
          <Items data={dataRender} />
        </Grid>
      )}
    </Grid>
  );
}
