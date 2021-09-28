import { CircularProgress, Dialog, FormControl, FormControlLabel, Grid, InputLabel, LinearProgress, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getMeasurementsData,
  getDetailMeasurements,
  getClothData,
  getMyClothData,
} from "../../../redux/Action";
import PropTypes from "prop-types";
import ImageMagnify from "./ImageMagnify";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
}));
export default function Order(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { open, onClose } = props;

  const [value, setValue] = React.useState("1");
  const [progress, setProgress] = React.useState(10);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [tel, setTel] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
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

  const [neckline, setNeckline] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [shoulderwidth, setShoulderwidth] = useState("");
  const [armpitcircumference, setArmpitcircumference] = useState("");
  const [biceps, setBiceps] = useState("");
  const [wristaround, setWristaround] = useState("");
  const [sleevelength, setSleevelength] = useState("");
  const [shirtlength, setShirtlength] = useState("");
  const [dresslength, setDresslength] = useState("");
  const [pantslength, setPantslength] = useState("");
  const [thighcircumference, setThighcircumference] = useState("");
  const [crotchlength, setCrotchlength] = useState("");
  const getParamsWaist = (event) => {
    setWaist(event.target.value);
  };
  const getParamsButtock = (event) => {
    setButtock(event.target.value);
  };
  const getParamsDresslength = (event) => {
    setDresslength(event.target.value);
  };
  const getParamsPantslength = (event) => {
    setPantslength(event.target.value);
  };
  const getParamsThighcircumference = (event) => {
    setThighcircumference(event.target.value);
  };
  const getParamsNeckline = (event) => {
    setNeckline(event.target.value);
  };
  const getParamsBust = (event) => {
    setBust(event.target.value);
  };
  const getParamsShoulderwidth = (event) => {
    setShoulderwidth(event.target.value);
  };
  const getParamsArmpitcircumference = (event) => {
    setArmpitcircumference(event.target.value);
  };
  const getParamsBiceps = (event) => {
    setBiceps(event.target.value);
  };
  const getParamsWristaround = (event) => {
    setWristaround(event.target.value);
  };
  const getParamsSleevelength = (event) => {
    setSleevelength(event.target.value);
  };
  const getParamsShirtlength = (event) => {
    setShirtlength(event.target.value);
  };
  const getParamsCrotchlength = (event) => {
    setCrotchlength(event.target.value);
  };
  const [measurement, setMeasurement] = useState();

  const {userInfo} = JSON.parse(localStorage.getItem('userInfo'));
  console.log(userInfo)
  const [loading, setLoading] = useState(true);
  const measurements = useSelector(state => state.measurements);
  const { measurementsData } = measurements;
  
  // console.log("???", detailData);
  console.log(measurementsData);

  

  const renderMenuMeasurement = () => {
    return measurementsData.map((value, key) => (
      <MenuItem value={value.id}>Mã số đăng ký thứ {key+1}</MenuItem>
    ));
  }
   const [loadingMeasurement, setLoadingMeasurement] = useState(false);
   const handleChangeMeasurement = (event, value) => {
     setMeasurement(event.target.value);
     setLoadingMeasurement(true);
     setTimeout(() => {const detailData = measurementsData.filter(
       (measurementsData) => measurementsData.id === value.props.value
     );
     detailData[0].m_crotchlength === 0
       ? setCrotchlength("")
       : setCrotchlength(detailData[0].m_crotchlength);
     detailData[0].m_neckline === 0
       ? setNeckline("")
       : setNeckline(detailData[0].m_neckline);
     detailData[0].m_bust === 0 ? setBust("") : setBust(detailData[0].m_bust);
     detailData[0].m_waist === 0
       ? setWaist("")
       : setWaist(detailData[0].m_waist);
     detailData[0].m_buttock === 0
       ? setButtock("")
       : setButtock(detailData[0].m_buttock);
     detailData[0].m_shoulderwidth === 0
       ? setShoulderwidth("")
       : setShoulderwidth(detailData[0].m_shoulderwidth);
     detailData[0].m_wristaround === 0
       ? setWristaround("")
       : setWristaround(detailData[0].m_wristaround);
     detailData[0].m_sleevelength === 0
       ? setSleevelength("")
       : setSleevelength(detailData[0].m_sleevelength);
     detailData[0].m_armpitcircumference === 0
       ? setArmpitcircumference("")
       : setArmpitcircumference(detailData[0].m_armpitcircumference);
     detailData[0].m_biceps === 0
       ? setBiceps("")
       : setBiceps(detailData[0].m_biceps);
     detailData[0].m_shirtlength === 0
       ? setShirtlength("")
       : setShirtlength(detailData[0].m_shirtlength);
     detailData[0].m_pantslength === 0
       ? setPantslength("")
       : setPantslength(detailData[0].m_pantslength);
     detailData[0].m_thighcircumference === 0
       ? setThighcircumference("")
       : setThighcircumference(detailData[0].m_thighcircumference);
     detailData[0].m_crotchlength === 0
       ? setCrotchlength("")
       : setCrotchlength(detailData[0].m_crotchlength);
     detailData[0].m_dresslength === 0
       ? setDresslength("")
       : setDresslength(detailData[0].m_dresslength);
     setLoadingMeasurement(false);
    }, 1000);
   };

  const [imgUpload, setImgUpload] = useState("");
  const [clothSelected, setClothSelected] = useState("");
  const [clothSelectedId, setClothSelectedId] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("nm");

  const handleChangeRadio = (event, value) => {
    setSelectedValue(event.target.value);
    setClothSelected("");
  };

  const cloth = useSelector((state) => state.cloth);
  const {clothData, myClothData} = cloth;
  let currentClothData = {};
  const renderCloth = () => {
    if(selectedValue === "nm"){
      currentClothData = clothData;
      return clothData.map((value, key) => (
        <MenuItem value={value.id} key={key}>
          {value.cloth_name}
        </MenuItem>
      ));
    } else {
      currentClothData = myClothData;
      return myClothData.map((value, key) => (
        <MenuItem value={value.id} key={key}>
          {value.cloth_name}
        </MenuItem>
      ));
    }
  }
  
  const handleChangeCloth = (event) => {
    const abc = currentClothData.filter((currentClothData) => currentClothData.id === event.target.value)
    setClothSelectedId(event.target.value);
    setClothSelected(abc);
    setImgUpload(abc[0].cloth_image);
  }
  const {productData} = props;
  const data1 = {
    cloth_material: productData.product_material,
  };
  const data2 = {
    cloth_userid: 1,
  };
  useEffect(() => {
    function setState(){
      dispatch(getMeasurementsData(userInfo.id));
      dispatch(getClothData(data1));
      dispatch(getMyClothData(data2));
      setFirstName(userInfo.user_firstname);
      setLastName(userInfo.user_lastname);
      setEmail(userInfo.user_email);
      setAddress(userInfo.user_address);
      setTel(userInfo.user_tel);
      setLoading(false);
    }
    setState();
  }, [])
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
    >
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={8}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Thông tin giao hàng</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                    <Grid item xs={6}>
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
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Thông tin số đo & loại vải</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChangeTab}
                            aria-label="lab API tabs example"
                            variant="fullWidth"
                          >
                            <Tab label="Số đo" value="1" />
                            <Tab label="Loại vải" value="2" />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Mã số đo
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={measurement}
                                  label="Mã số đo"
                                  onChange={handleChangeMeasurement}
                                  disabled={false}
                                >
                                  {renderMenuMeasurement()}
                                </Select>
                              </FormControl>
                            </Grid>

                            {loadingMeasurement ? (
                              <Box
                                sx={{
                                  width: "100%",
                                  margin: "20px 0px 0px 0px",
                                }}
                              >
                                <LinearProgress />
                              </Box>
                            ) : (
                              <>
                                <Grid item xs={6}>
                                  <TextField
                                    id="neckline"
                                    label="Vòng cổ"
                                    placeholder="Đo vòng quanh chân cổ"
                                    margin="normal"
                                    defaultValue={neckline}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsNeckline}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="bust"
                                    label="Vòng ngực"
                                    placeholder="Đo vòng quanh ngực, chỗ nở nhất"
                                    margin="normal"
                                    defaultValue={bust}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsBust}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="waist"
                                    label="Vòng eo"
                                    placeholder="Đo vòng quanh eo"
                                    margin="normal"
                                    defaultValue={waist}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsWaist}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="buttock"
                                    label="Vòng mông"
                                    placeholder="Đo vòng quanh mông, chỗ nở nhất"
                                    margin="normal"
                                    defaultValue={buttock}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsButtock}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="shoulderwidth"
                                    label="Rộng vai"
                                    placeholder="Từ đầu vai trái sang đầu vai phải"
                                    margin="normal"
                                    defaultValue={shoulderwidth}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsShoulderwidth}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="wristaround"
                                    label="Cửa tay"
                                    placeholder="Đo vòng quanh nắm tay"
                                    margin="normal"
                                    defaultValue={wristaround}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsWristaround}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="sleevelength"
                                    label="Dài tay"
                                    placeholder="Từ đầu vai đến qua khỏi mắt cá tay"
                                    margin="normal"
                                    defaultValue={sleevelength}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsSleevelength}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    id="shirtlength"
                                    label="Dài áo"
                                    placeholder="Từ đốt xương cổ thứ 7 đến ngang mông"
                                    margin="normal"
                                    defaultValue={shirtlength}
                                    fullWidth
                                    size="small"
                                    onChange={getParamsShirtlength}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                          <Grid container>
                            <Grid item xs={4}>
                              <ImageMagnify image={imgUpload}></ImageMagnify>
                            </Grid>
                            <Grid item xs={8} sx={{ padding: 2 }}>
                              <Grid container>
                                <Grid item xs={4}>
                                  <RadioGroup
                                    aria-label="gender"
                                    defaultValue="nm"
                                    name="radio-buttons-group"
                                    onChange={handleChangeRadio}
                                  >
                                    <FormControlLabel
                                      value="nm"
                                      control={<Radio />}
                                      label="Nhà may"
                                    />
                                    <FormControlLabel
                                      value="kh"
                                      control={<Radio />}
                                      label="Của tôi"
                                    />
                                  </RadioGroup>
                                </Grid>
                                <Grid item xs={8}>
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      Tên vải
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={clothSelectedId}
                                      label="Tên vải"
                                      onChange={handleChangeCloth}
                                    >
                                 
                                      {renderCloth()}
                               
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Phương thức thanh toán & giao hàng</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                    blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={4}>
              abc
            </Grid>
          </Grid>
        </>
      )}
    </Dialog>
  );
}
