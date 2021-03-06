import {
  Badge,
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  Input,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
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
  getClothData,
  getMyClothData,
  addOrder,
} from "../../../redux/Action";
import ImageMagnify from "./ImageMagnify";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { FRONTEND_URL, LOCAL_PATH } from "../../../constants/Constants";
import clsx from "clsx";
import axios from "axios";
import { MyFormControl, MyTextField } from "../../utility/Utility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@material-ui/core";

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
  title: {
    fontFamily: "Helvetica Neue, sans-serif !important",
    fontWeight: "normal !important",
    color: "#333333 !important",
    fontSize: "18px !important",
  },
  img: {
    height: 64,
    width: 64,
    boxShadow: "0 0 0 1px rgb(0 0 0 / 10%) inset",
    borderRadius: "8px",
  },
  box: {
    backgroundColor: "#fafafa",
    padding: 10,
  },
  productTitle: {
    color: "#4b4b4b",
    padding: "0px 5px",
  },
  dropZone: {
    border: "1px dashed #000000",
    height: 100,
    width: "100%",
    margin: "2px !important",
  },
  dropZone1: {
    height: 100,
    width: "100%",
    margin: "2px !important",
  },
  uploadImg: {
    height: "80%",
    width: "80%",
  },
  uploadImgBig: {
    height: "100%",
    width: "100%",
  },
  labelInputImg: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Order(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = useState("panel1");

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

  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const [loading, setLoading] = useState(true);
  const measurements = useSelector((state) => state.measurements);
  const { measurementsData } = measurements;

  const [loadingMeasurement, setLoadingMeasurement] = useState(false);
  const handleChangeMeasurement = (event, value) => {
    setMeasurement(event.target.value);
    setLoadingMeasurement(true);
    setTimeout(() => {
      const detailData = measurementsData.filter(
        (measurementsData) => measurementsData.id === value.props.value
      );
      detailData[0].m_neckline === 0
        ? setNeckline(0)
        : setNeckline(detailData[0].m_neckline);
      detailData[0].m_bust === 0 ? setBust(0) : setBust(detailData[0].m_bust);
      detailData[0].m_waist === 0
        ? setWaist(0)
        : setWaist(detailData[0].m_waist);
      detailData[0].m_buttock === 0
        ? setButtock(0)
        : setButtock(detailData[0].m_buttock);
      detailData[0].m_shoulderwidth === 0
        ? setShoulderwidth(0)
        : setShoulderwidth(detailData[0].m_shoulderwidth);
      detailData[0].m_wristaround === 0
        ? setWristaround(0)
        : setWristaround(detailData[0].m_wristaround);
      detailData[0].m_sleevelength === 0
        ? setSleevelength(0)
        : setSleevelength(detailData[0].m_sleevelength);
      detailData[0].m_armpitcircumference === 0
        ? setArmpitcircumference(0)
        : setArmpitcircumference(detailData[0].m_armpitcircumference);
      detailData[0].m_biceps === 0
        ? setBiceps(0)
        : setBiceps(detailData[0].m_biceps);
      detailData[0].m_shirtlength === 0
        ? setShirtlength(0)
        : setShirtlength(detailData[0].m_shirtlength);
      detailData[0].m_pantslength === 0
        ? setPantslength(0)
        : setPantslength(detailData[0].m_pantslength);
      detailData[0].m_thighcircumference === 0
        ? setThighcircumference(0)
        : setThighcircumference(detailData[0].m_thighcircumference);
      detailData[0].m_crotchlength === 0
        ? setCrotchlength(0)
        : setCrotchlength(detailData[0].m_crotchlength);
      detailData[0].m_dresslength === 0
        ? setDresslength(0)
        : setDresslength(detailData[0].m_dresslength);
      setLoadingMeasurement(false);
    }, 1000);
  };

  const [owner, setOwner] = useState("nm");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0)
  const [qty, setQty] = useState(1);

  const cloth = useSelector((state) => state.cloth);
  const { clothData, myClothData } = cloth;

  const [shippingMethod, setShippingMethod] = useState("TNM");
  const handleChangeShippingMethod = (event) => {
    setShippingMethod(event.target.value);
  };
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const { productData } = props;

  const data2 = {
    cloth_userid: userInfo.id,
  };

  const handleSubmit = () => {
    const today = new Date();
    const enddate = new Date();
    enddate.setDate(today.getDate() + 10);
    const formData = new FormData();

    formData.append("order_subtotal", price / qty);
    formData.append("order_discount", discount / qty);
    formData.append(
      "order_total",
      (price - discount - voucherDiscount + shippingPrice) / qty
    );
    formData.append("order_paymentid", paymentMethod);
    formData.append("order_shippingid", shippingMethod);
    formData.append("order_statusid", 0);
    formData.append("order_userid", userInfo.id);
    formData.append("od_productid", productData.id);
    formData.append("voucherCode", voucherCode);
    console.log("voucherDiscount", voucherDiscount);
    console.log("voucherCode", voucherCode);
    console.log("price", price/qty)
    console.log("order_total", (price - discount - voucherDiscount + shippingPrice) / qty);
    if(parseInt(qty) < 1){
      enqueueSnackbar("S??? l?????ng mua kh??ng h???p l???", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!lastName || !firstName || !tel || !email || !address) {
      enqueueSnackbar("Vui l??ng nh???p th??ng tin c?? nh??n", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      formData.append("order_customername", lastName + " " + firstName);
      formData.append("order_customeraddress", address);
      formData.append("order_customerphone", tel);
      formData.append("order_customeremail", email);
      formData.append("order_startdate", format(today, "yyyy-MM-dd HH:mm:ss"));
      formData.append("order_enddate", format(enddate, "yyyy-MM-dd HH:mm:ss"));
    }
    if (!province) {
      enqueueSnackbar("Vui l??ng ch???n T???nh/Th??nh", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!district) {
      enqueueSnackbar("Vui l??ng ch???n Qu???n/Huy???n", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (!ward) {
      enqueueSnackbar("Vui l??ng ch???n X??/Ph?????ng", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    formData.append("order_wardid", ward);
    // Blazer, tuxedo, suit
    if (
      productData.product_typeid === "BFM" ||
      productData.product_typeid === "TFM"
    ) {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !sleevelength ||
        !shirtlength ||
        !wristaround
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", 0);
        formData.append("od_biceps", 0);
        formData.append("od_wristaround", wristaround);
        formData.append("od_sleevelength", sleevelength);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", 0);
        formData.append("od_thighcircumference", 0);
        formData.append("od_dresslength", 0);
        formData.append("od_pantslength", 0);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 2 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 2 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {
                dispatch(addOrder(formData));
              }, i * 500 + 500); 
            }
          }
        }
      }
    }

    // suit nam
    if (productData.product_typeid === "SFM") {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !sleevelength ||
        !shirtlength ||
        !wristaround ||
        !crotchlength ||
        !thighcircumference ||
        !pantslength
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", 0);
        formData.append("od_biceps", 0);
        formData.append("od_wristaround", wristaround);
        formData.append("od_sleevelength", sleevelength);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", crotchlength);
        formData.append("od_thighcircumference", thighcircumference);
        formData.append("od_dresslength", 0);
        formData.append("od_pantslength", pantslength);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 6 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 6 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {dispatch(addOrder(formData));}, i*500 + 500) 
            }
          }
        }
      }
    }

    // Gile man
    if (productData.product_typeid === "GFM") {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !shirtlength
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", 0);
        formData.append("od_biceps", 0);
        formData.append("od_wristaround", 0);
        formData.append("od_sleevelength", 0);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", 0);
        formData.append("od_thighcircumference", 0);
        formData.append("od_dresslength", 0);
        formData.append("od_pantslength", 0);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 2 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 2 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {
                dispatch(addOrder(formData));
              }, i * 500 + 500); 
            }
          }
        }
      }
    }
    // gile nu
    if (productData.product_typeid === "GFF") {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !armpitcircumference ||
        !shirtlength ||
        !dresslength
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", armpitcircumference);
        formData.append("od_biceps", 0);
        formData.append("od_wristaround", 0);
        formData.append("od_sleevelength", 0);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", 0);
        formData.append("od_thighcircumference", 0);
        formData.append("od_dresslength", dresslength);
        formData.append("od_pantslength", pantslength);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 2 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 2 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {
                dispatch(addOrder(formData));
              }, i * 500 + 500); 
            }
          }
        }
      }
    }

    // vest cho n???
    if (productData.product_typeid === "VFF") {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !wristaround ||
        !sleevelength ||
        !shirtlength ||
        !armpitcircumference ||
        !biceps
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", armpitcircumference);
        formData.append("od_biceps", biceps);
        formData.append("od_wristaround", wristaround);
        formData.append("od_sleevelength", sleevelength);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", 0);
        formData.append("od_thighcircumference", 0);
        formData.append("od_dresslength", 0);
        formData.append("od_pantslength", 0);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 2 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 2 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {
                dispatch(addOrder(formData));
              }, i * 500 + 500); 
            }
          }
        }
      }
    }

    // b??? vest cho n???
    if (productData.product_typeid === "SFF") {
      if (
        !neckline ||
        !bust ||
        !waist ||
        !buttock ||
        !shoulderwidth ||
        !wristaround ||
        !sleevelength ||
        !shirtlength ||
        !armpitcircumference ||
        !biceps ||
        !thighcircumference ||
        !dresslength ||
        !pantslength
      ) {
        enqueueSnackbar("Vui ??i???n nh???p ?????y ????? s??? ??o", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return false;
      } else {
        formData.append("od_neckline", neckline);
        formData.append("od_bust", bust);
        formData.append("od_waist", waist);
        formData.append("od_buttock", buttock);
        formData.append("od_shoulderwidth", shoulderwidth);
        formData.append("od_armpitcircumference", armpitcircumference);
        formData.append("od_biceps", biceps);
        formData.append("od_wristaround", wristaround);
        formData.append("od_sleevelength", sleevelength);
        formData.append("od_shirtlength", shirtlength);
        formData.append("od_crotchlength", 0);
        formData.append("od_thighcircumference", thighcircumference);
        formData.append("od_dresslength", dresslength);
        formData.append("od_pantslength", pantslength);
      }

      if (owner === "nm") {
        if (isMultiColor) {
          let count = 0;
          let quantityCount = 0;
          for (let i = 0; i < qty; i++) {
            if (clothIdList[i].value === "") {
              count = count + 1;
            }
            if (clothQuantityList[i].value < 6 * qty) {
              quantityCount = quantityCount + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (quantityCount !== 0) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[i].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (clothIdList[0].value === "") {
            enqueueSnackbar("Vui l??ng ch???n lo???i v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else if (clothQuantityList[0].value < 6 * qty) {
            enqueueSnackbar("Kh??ng ????? v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            for (let i = 0; i < qty; i++) {
              formData.set("od_clothid", clothIdList[0].value);
              formData.set("haveFile", 0);
              dispatch(addOrder(formData));
            }
          }
        }
      } else {
        if (isMultiColor) {
          let count = 0;
          for (let i = 0; i < qty; i++) {
            if (fileList[i].value === "") {
              count = count + 1;
            }
          }
          if (count !== 0) {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            console.log("yeu cau nhap day du vai");
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[i]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + i + 1);
              dispatch(addOrder(formData));
            }
          }
        } else {
          if (fileList[0].value === "") {
            enqueueSnackbar("Ch??a import h??nh ???nh v???i", {
              variant: "error",
              autoHideDuration: 2000,
            });
            return false;
          } else {
            formData.append("FRONTEND_URL", FRONTEND_URL);
            let od_id = parseInt(
              clothData[
                Object.keys(clothData)
                  .sort(function (a, b) {
                    if (a.id >= b.id) return a;
                  })
                  .pop()
              ].id
            );
            for (let i = 0; i < qty; i++) {
              formData.set("haveFile", 1);
              formData.set("file", fileList[0]);
              formData.set(
                "cloth_name",
                "V???i c???a user " +
                  userInfo.id +
                  " g???i ng??y " +
                  format(today, "yyyy-MM-dd HH:mm:ss")
              );
              formData.set("od_clothid", od_id + 1);
              setTimeout(() => {
                dispatch(addOrder(formData));
              }, i * 500 + 500); 
            }
          }
        }
      }
    }

    enqueueSnackbar("?????t may th??nh c??ng", {
      variant: "success",
      autoHideDuration: 2000,
    });

    onClose();
  };

  const renderMenuMeasurement = () => {
    if (
      productData.product_typeid === "BFM" ||
      productData.product_typeid === "TFM" ||
      productData.product_typeid === "SFM" ||
      productData.product_typeid === "GFM"
    ) {
      return measurementsData
        .filter((item) => item.m_gender === "male")
        .map((value, key) => (
          <MenuItem value={value.id} key={key}>
            M?? s??? ????ng k?? (nam) th??? {key + 1}
          </MenuItem>
        ));
    } else {
      return measurementsData
        .filter((item) => item.m_gender === "female")
        .map((value, key) => (
          <MenuItem value={value.id} key={key}>
            M?? s??? ????ng k?? (n???) th??? {key + 1}
          </MenuItem>
        ));
    }
  };

  const renderMeasurement = () => {
    if (
      productData.product_typeid === "BFM" ||
      productData.product_typeid === "TFM"
    ) {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="wristaround"
              label="C???a tay"
              placeholder="??o v??ng quanh n???m tay"
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
            <MyTextField
              id="sleevelength"
              label="D??i tay"
              placeholder="T??? ?????u vai ?????n qua kh???i m???t c?? tay"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
      );
    }
    if (productData.product_typeid === "SFM") {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="wristaround"
              label="C???a tay"
              placeholder="??o v??ng quanh n???m tay"
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
            <MyTextField
              id="sleevelength"
              label="D??i tay"
              placeholder="T??? ?????u vai ?????n qua kh???i m???t c?? tay"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
          <Grid item xs={6}>
            <MyTextField
              id="thighcircumference"
              label="V??ng ????i"
              placeholder="??o v??ng quang ????i ch??? n??? nh???t"
              margin="normal"
              defaultValue={thighcircumference}
              fullWidth
              size="small"
              onChange={getParamsThighcircumference}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="crotchlength"
              label="V??ng ????y"
              placeholder="T??? eo tr?????ng v??ng qua eo sau"
              margin="normal"
              defaultValue={crotchlength}
              fullWidth
              size="small"
              onChange={getParamsCrotchlength}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="pantslength"
              label="D??i qu???n"
              placeholder="??o t??? eo ?????n ch???m g??t ch??n"
              margin="normal"
              defaultValue={pantslength}
              fullWidth
              size="small"
              onChange={getParamsPantslength}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    }
    if (productData.product_typeid === "GFM") {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
      );
    }
    if (productData.product_typeid === "GFF") {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
          <Grid item xs={6}>
            <MyTextField
              id="armpitcircumference"
              label="V??ng n??ch"
              placeholder="Ch???ng tay l??n h??ng, ??o s??t v??ng n??ch"
              margin="normal"
              defaultValue={armpitcircumference}
              fullWidth
              size="small"
              onChange={getParamsArmpitcircumference}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="dresslength"
              label="D??i v??y"
              placeholder="??o t??? eo ?????n g???i"
              margin="normal"
              defaultValue={dresslength}
              fullWidth
              size="small"
              onChange={getParamsDresslength}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    }
    if (productData.product_typeid === "VFF") {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="wristaround"
              label="C???a tay"
              placeholder="??o v??ng quanh n???m tay"
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
            <MyTextField
              id="sleevelength"
              label="D??i tay"
              placeholder="T??? ?????u vai ?????n qua kh???i m???t c?? tay"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
          <Grid item xs={6}>
            <MyTextField
              id="armpitcircumference"
              label="V??ng n??ch"
              placeholder="Ch???ng tay l??n h??ng, ??o s??t v??ng n??ch"
              margin="normal"
              defaultValue={armpitcircumference}
              fullWidth
              size="small"
              onChange={getParamsArmpitcircumference}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="biceps"
              label="B???p tay"
              placeholder="??o v??ng s??t b???p tay"
              margin="normal"
              defaultValue={biceps}
              fullWidth
              size="small"
              onChange={getParamsBiceps}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    }
    if (productData.product_typeid === "SFF") {
      return (
        <>
          <Grid item xs={6}>
            <MyTextField
              id="neckline"
              label="V??ng c???"
              placeholder="??o v??ng quanh ch??n c???"
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
            <MyTextField
              id="bust"
              label="V??ng ng???c"
              placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
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
            <MyTextField
              id="waist"
              label="V??ng eo"
              placeholder="??o v??ng quanh eo"
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
            <MyTextField
              id="buttock"
              label="V??ng m??ng"
              placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
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
            <MyTextField
              id="shoulderwidth"
              label="R???ng vai"
              placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
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
            <MyTextField
              id="wristaround"
              label="C???a tay"
              placeholder="??o v??ng quanh n???m tay"
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
            <MyTextField
              id="sleevelength"
              label="D??i tay"
              placeholder="T??? ?????u vai ?????n qua kh???i m???t c?? tay"
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
            <MyTextField
              id="shirtlength"
              label="D??i ??o"
              placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
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
          <Grid item xs={6}>
            <MyTextField
              id="armpitcircumference"
              label="V??ng n??ch"
              placeholder="Ch???ng tay l??n h??ng, ??o s??t v??ng n??ch"
              margin="normal"
              defaultValue={armpitcircumference}
              fullWidth
              size="small"
              onChange={getParamsArmpitcircumference}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="biceps"
              label="B???p tay"
              placeholder="??o v??ng s??t b???p tay"
              margin="normal"
              defaultValue={biceps}
              fullWidth
              size="small"
              onChange={getParamsBiceps}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="thighcircumference"
              label="V??ng ????i"
              placeholder="??o v??ng quang ????i ch??? n??? nh???t"
              margin="normal"
              defaultValue={thighcircumference}
              fullWidth
              size="small"
              onChange={getParamsThighcircumference}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="dresslength"
              label="D??i v??y"
              placeholder="??o t??? eo ?????n g???i"
              margin="normal"
              defaultValue={dresslength}
              fullWidth
              size="small"
              onChange={getParamsDresslength}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextField
              id="pantslength"
              label="D??i qu???n"
              placeholder="??o t??? eo ?????n ch???m g??t ch??n"
              margin="normal"
              defaultValue={pantslength}
              fullWidth
              size="small"
              onChange={getParamsPantslength}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </>
      );
    }
  };

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    async function setState() {
      if (userInfo.user_wardid !== null) {
        const data01 = await axios.get(`/getAddress.${userInfo.user_wardid}`);
        const data02 = await axios.get(
          `/getDistrict.${data01.data[0].ward_provinceid}`
        );
        const data03 = await axios.get(
          `/getWard.${data01.data[0].ward_provinceid}&${data01.data[0].ward_districtid}`
        );
        if (data01.data[0].ward_provinceid === 12) {
          setShippingPrice(0);
        } else {
          setShippingPrice(30000);
        }
        setDistrict(data01.data[0].ward_districtid);
        setProvince(data01.data[0].ward_provinceid);
        setDistrictData(data02.data);
        setWardData(data03.data);
      }
      dispatch(getMeasurementsData(userInfo.id));
      dispatch(getClothData());
      dispatch(getMyClothData(data2));
      setFirstName(userInfo.user_firstname);
      setLastName(userInfo.user_lastname);
      setEmail(userInfo.user_email);
      setAddress(userInfo.user_address);
      setTel(userInfo.user_tel);
      setPrice(parseInt(productData.product_price));
      setWard(userInfo.user_wardid);
      setLoading(false);
    }
    getProvinceData();
    setState();
  }, []);

  const [fileList, setFileList] = useState([{ value: "" }]);
  const [imageList, setImageList] = useState([
    { value: LOCAL_PATH + "images/upload-icon2.png" },
  ]);

  const saveFile = (e, index) => {
    const list = [...fileList];
    list[index] = e.target.files[0];
    const imgList = [...imageList];
    setFileList(list);
    let reader = new FileReader();
    var fileInput = e.target.files[0];
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      imgList[index].value = reader.result;
      setImageList(imgList);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  let currentClothData = {};
  const renderCloth = () => {
    if (owner === "nm") {
      currentClothData = clothData.filter(
        (item) => item.cloth_material === productData.product_material
      );
      return currentClothData.map((value, key) => (
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
  };

  const [clothIdList, setClothIdList] = useState([{ value: "" }]);
  const [clothQuantityList, setClothQuantityList] = useState([{ value: 0 }]);
  const [clothImageList, setClothImageList] = useState([
    { value: LOCAL_PATH + "images/loading.gif" },
  ]);

  const increment = () => {
    // const temp = price + productData.product_price;
    // owner === "kh" ? setDiscount(temp * 0.3) : setDiscount(0);
    console.log(qty+1)
    setQty(qty + 1);
    setPrice(price + productData.product_price);
    if (qty + 1 !== 1 || qty + 1 !== 0) {
      setVoucher("");
      setVoucherDiscount(0);
      setVoucherPercent(0);
      setVoucherCode("");
      setShippingPrice(0);
    } else {
      if (province === 12) {
        setShippingPrice(0);
      } else {
        setShippingPrice(30000);
      }
    }
    if (owner === "nm") {
      clothIdList.push({ value: "" });
      clothImageList.push({ value: LOCAL_PATH + "images/loading.gif" });
      clothQuantityList.push({ value: 0 });
    } else {
      fileList.push({ value: "" });
      imageList.push({ value: LOCAL_PATH + "images/upload-icon2.png" });
    }
  };

  const decrement = () => {
    let temp = 0;
    qty > 1 ? setQty(qty - 1) : setQty(1);
    qty > 1
      ? setPrice(price - productData.product_price)
      : setPrice(productData.product_price);
    qty > 1
      ? (temp = price - productData.product_price)
      : (temp = productData.product_price);
    // owner === "kh" ? setDiscount(temp * 0.3) : setDiscount(0);
    console.log(qty-1)
    if(qty-1 === 1 || qty-1 === 0){
      if(province === 12){
        setShippingPrice(0)
      } else {
        setShippingPrice(30000);
      }
    } else {
      setVoucher("");
      setVoucherDiscount(0);
      setVoucherPercent(0);
      setVoucherCode("");
      setShippingPrice(0);
    }
    if (qty > 1) {
      if (owner === "nm") {
        clothIdList.splice(clothIdList.length - 1);
        clothImageList.splice(clothImageList.length - 1);
        clothQuantityList.splice(clothQuantityList.length - 1);
      } else {
        const list = [...fileList];
        const imgList = [...imageList];
        list.splice(list.length - 1);
        imgList.splice(imgList.length - 1);
        setFileList(list);
        setImageList(imgList);
      }
    }
  };

  const [isMultiColor, setIsMultiColor] = useState(true);
  const handleChangeRadio = (event, value) => {
    setOwner(event.target.value);
    // event.target.value === "kh" ? setDiscount(price * 0.3) : setDiscount(0);
    for (let i = 0; i < qty; i++) {
      if (event.target.value === "nm") {
        clothIdList.push({ value: "" });
        clothImageList.push({ value: LOCAL_PATH + "images/loading.gif" });
        clothQuantityList.push({ value: 0 });
        clothIdList.splice(qty);
        clothImageList.splice(qty);
        clothQuantityList.splice(qty);
      } else {
        fileList.push({ value: "" });
        imageList.push({ value: LOCAL_PATH + "images/upload-icon2.png" });
        fileList.splice(qty);
        imageList.splice(qty);
      }
    }
  };

  const handleChangeClothList = (event, index) => {
    const abc = currentClothData.filter(
      (currentClothData) => currentClothData.id === event.target.value
    );
    const list = [...clothIdList];
    list[index].value = event.target.value;
    setClothIdList(list);
    const imageList = [...clothImageList];
    imageList[index].value = abc[0].cloth_image;
    setClothImageList(imageList);
    const quantityList = [...clothQuantityList];
    quantityList[index].value = abc[0].cloth_quantity;
    setClothQuantityList(quantityList);
  };

  const renderImgUpload = () => {
    clothIdList.splice(qty);
    clothImageList.splice(qty);
    clothQuantityList.splice(qty);
    fileList.splice(qty);
    imageList.splice(qty);
    if (owner === "nm") {
      if (!isMultiColor) {
        return (
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ImageMagnify
                image={clothImageList[0].value}
                quantity={clothQuantityList[0].value}
              ></ImageMagnify>
            </Grid>
            <Grid item xs={8}>
              <MyFormControl fullWidth>
                <InputLabel id={`demo-simple-select-label0`}>
                  Lo???i v???i 1
                </InputLabel>
                <Select
                  labelId={`demo-simple-select-label0`}
                  id={`demo-simple-select0`}
                  value={clothIdList[0].value}
                  label="T??n v???i"
                  onChange={(e) => handleChangeClothList(e, 0)}
                >
                  {renderCloth()}
                </Select>
              </MyFormControl>
            </Grid>
          </Grid>
        );
      } else
        return clothIdList.map((value, key) => (
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ImageMagnify
                image={clothImageList[key].value}
                quantity={clothQuantityList[key].value}
              ></ImageMagnify>
            </Grid>
            <Grid item xs={8}>
              <MyFormControl fullWidth>
                <InputLabel id={`demo-simple-select-label${key}`}>
                  Lo???i v???i {key + 1}
                </InputLabel>
                <Select
                  labelId={`demo-simple-select-label${key}`}
                  id={`demo-simple-select${key}`}
                  value={clothIdList[key].value}
                  label="T??n v???i"
                  onChange={(e) => handleChangeClothList(e, key)}
                >
                  {renderCloth()}
                </Select>
              </MyFormControl>
            </Grid>
            <Grid item xs={12} sx={{ m: 0.5 }}>
              <Divider />
            </Grid>
          </Grid>
        ));
    } else {
      if (!isMultiColor) {
        return (
          <Grid
            item
            xs={3}
            className={clsx(
              fileList[0].name ? classes.dropZone1 : classes.dropZone
            )}
            sx={center}
          >
            <input
              accept="image/*"
              className={classes.input}
              id={`icon-button-file0`}
              type="file"
              onChange={(e) => saveFile(e, 0)}
            />
            <label
              htmlFor={`icon-button-file0`}
              className={classes.labelInputImg}
            >
              <img
                src={imageList[0].value}
                alt="uploadImg"
                className={clsx(
                  fileList[0].name ? classes.uploadImgBig : classes.uploadImg
                )}
              />
            </label>
          </Grid>
        );
      } else
        return fileList.map((value, key) => (
          <Grid
            item
            xs={3}
            className={clsx(
              fileList[key].name ? classes.dropZone1 : classes.dropZone
            )}
            sx={center}
            key={key}
          >
            <input
              accept="image/*"
              className={classes.input}
              id={`icon-button-file${key}`}
              type="file"
              onChange={(e) => saveFile(e, key)}
            />
            <label
              htmlFor={`icon-button-file${key}`}
              className={classes.labelInputImg}
            >
              <img
                src={imageList[key].value}
                alt="uploadImg"
                className={clsx(
                  fileList[key].name ? classes.uploadImgBig : classes.uploadImg
                )}
              />
            </label>
          </Grid>
        ));
    }
  };

  const handleChangeProvince = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(`/getDistrict.${e.target.value}`);
    setDistrictData(data);
    setWardData([]);
    setDistrict();
    setWard();
    if(e.target.value === 12){
      setShippingPrice(0)
    } else {
      setShippingPrice(30000)
    }
  };
  const handleChangeDistrict = async (e) => {
    setDistrict(e.target.value);
    const { data } = await axios.get(`/getWard.${province}&${e.target.value}`);
    setWardData(data);
    setWard();
  };
  const handleChangeWard = (e) => {
    setWard(e.target.value);
  };

  const renderAddressForm = () => {
    return (
      <>
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="province-select-label">T???nh/Th??nh</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-simple-select"
              defaultValue={province}
              label="T???nh/Th??nh"
              onChange={handleChangeProvince}
            >
              {provinceData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.province_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="district-select-label">Qu???n/Huy???n</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-simple-select"
              defaultValue={district}
              label="Qu???n/Huy???n"
              onChange={handleChangeDistrict}
            >
              {districtData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.district_prefix} {value.district_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "10px" }}>
          <MyFormControl fullWidth>
            <InputLabel id="ward-select-label">X??/Ph?????ng</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-simple-select"
              defaultValue={ward}
              label="X??/Ph?????ng"
              onChange={handleChangeWard}
            >
              {wardData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.ward_prefix} {value.ward_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
      </>
    );
  };
 
  const [voucher, setVoucher] = useState();
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherPercent, setVoucherPercent] = useState(0);
  const [voucherCode, setVoucherCode] = useState();
  const handleClickVoucher = async () => {
    const {data} = await axios.get(`useVoucher.${voucher}`);
    console.log(data)
    if(data === "NO"){
      enqueueSnackbar("Kh??ng ????ng m?? voucher", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setVoucherDiscount(0);
      setVoucherPercent(0);
      setVoucherCode("")
      return false;
    }
    if(data === "ISUSED"){
      enqueueSnackbar("M?? voucher ???? ???????c s??? d???ng", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setVoucherDiscount(0);
      setVoucherPercent(0);
      setVoucherCode("")
      return false;
    }
    if(data === "EXPIRED"){
      enqueueSnackbar("M?? voucher ???? h???t h???n", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setVoucherDiscount(0);
      setVoucherPercent(0);
      setVoucherCode("")
      return false;
    }
    setVoucherDiscount((price*data.gv_discount/100))
    setVoucherPercent(data.gv_discount);
    setVoucherCode(voucher);
    enqueueSnackbar("Nh???p m?? voucher th??nh c??ng", {
      variant: "success",
      autoHideDuration: 2000,
    });
  }

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
                  <Typography>Th??ng tin giao h??ng</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <MyTextField
                        id="lastname"
                        label="H???"
                        placeholder="Nh???p h???"
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
                      <MyTextField
                        id="firstname"
                        label="T??n"
                        placeholder="Nh???p t??n"
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
                      <MyTextField
                        id="tel"
                        label="S??? ??i???n tho???i"
                        placeholder="Nh???p s??? ??i???n tho???i"
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
                      <MyTextField
                        id="email"
                        label="Email"
                        placeholder="Nh???p email"
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
                      <MyTextField
                        id="address"
                        label="?????a ch??? li??n l???c"
                        placeholder="Nh???p s??? nh??, t??n ???????ng"
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
                    {renderAddressForm()}
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
                  <Typography>Th??ng tin s??? ??o & lo???i v???i</Typography>
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
                            <Tab label="S??? ??o" value="1" />
                            <Tab label="Lo???i v???i" value="2" />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                              <MyFormControl fullWidth>
                                <InputLabel id="measurment-select-label">
                                  M?? s??? ??o
                                </InputLabel>
                                <Select
                                  labelId="measurment-select-label"
                                  id="measurement-simple-select"
                                  value={measurement}
                                  label="M?? s??? ??o"
                                  onChange={handleChangeMeasurement}
                                  disabled={false}
                                >
                                  {renderMenuMeasurement()}
                                </Select>
                              </MyFormControl>
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
                              <>{renderMeasurement()}</>
                            )}
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                          <Grid container>
                            <Grid item xs={3}>
                              <RadioGroup
                                aria-label="gender"
                                defaultValue={owner}
                                name="radio-buttons-group"
                                onChange={handleChangeRadio}
                              >
                                <FormControlLabel
                                  value="nm"
                                  control={<Radio />}
                                  label="Nh?? may"
                                />
                                <FormControlLabel
                                  value="kh"
                                  control={<Radio />}
                                  label="C???a t??i"
                                />
                              </RadioGroup>
                              <FormControl
                                component="fieldset"
                                variant="standard"
                              >
                                <FormLabel component="legend">
                                  M??u s???c
                                </FormLabel>

                                <FormControlLabel
                                  control={
                                    <Switch
                                      defaultChecked={isMultiColor}
                                      onClick={(e) =>
                                        setIsMultiColor(!isMultiColor)
                                      }
                                    />
                                  }
                                  label={isMultiColor ? "Nhi???u m??u" : "M???t m??u"}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container>{renderImgUpload()}</Grid>
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
                  <Typography>Ph????ng th???c v???n chuy???n & thanh to??n</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12} sx={{ margin: "10px 0px" }}>
                      <Typography className={classes.title}>
                        Ph????ng th???c v???n chuy???n
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        name="use-radio-group"
                        defaultValue={shippingMethod}
                        sx={{
                          boxShadow: "0 0 0 1px #d9d9d9",
                          borderRadius: "4px",
                        }}
                        onChange={handleChangeShippingMethod}
                      >
                        <FormControlLabel
                          value="TNM"
                          label="Nh???n h??ng t???i nh?? may"
                          control={<Radio />}
                          sx={{ padding: "5px 10px" }}
                        />
                        <Divider />
                        <FormControlLabel
                          value="GTN"
                          label="Giao t???n nh??"
                          control={<Radio />}
                          sx={{ padding: "5px 10px" }}
                        />
                      </RadioGroup>

                      <Grid item xs={12} sx={{ margin: "10px 0px" }}>
                        <Typography className={classes.title}>
                          Ph????ng th???c thanh to??n
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroup
                          name="use-radio-group"
                          defaultValue={paymentMethod}
                          sx={{
                            boxShadow: "0 0 0 1px #d9d9d9",
                            borderRadius: "4px",
                          }}
                          onChange={handleChangePaymentMethod}
                        >
                          <FormControlLabel
                            value="COD"
                            label="Thanh to??n khi giao h??ng (COD)"
                            control={<Radio />}
                            sx={{ padding: "5px 10px" }}
                          />
                          <Divider />
                          <FormControlLabel
                            value="OWM"
                            label="Thanh to??n online qua v?? MoMo"
                            control={<Radio />}
                            sx={{ padding: "5px 10px" }}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={4} className={classes.box}>
              <Grid container>
                <Grid item xs={2} sx={center}>
                  <Badge badgeContent={qty} color="primary">
                    <img
                      src={productData.product_image1}
                      alt="abc"
                      className={classes.img}
                    ></img>
                  </Badge>
                </Grid>
                <Grid item xs={7} sx={center} className={classes.productTitle}>
                  <Typography sx={{ fontSize: "14px" }}>
                    {productData.product_name}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={center} className={classes.productTitle}>
                  <Typography sx={{ fontSize: "14px" }}>
                    {price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ margin: "10px 0px" }} />
              <Grid container sx={center}>
                <Grid item xs={7}>
                  <Typography sx={{ fontSize: "14px" }}>S??? l?????ng</Typography>
                </Grid>
                <Grid item xs={5}>
                  <ButtonGroup>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={decrement}
                    >
                      <Icon>remove</Icon>
                    </Button>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={qty}
                      onChange={(e) => {
                        var num = parseInt(e.target.value);
                        setQty(parseInt(num));
                        setPrice(num * productData.product_price);
                        if (num > 1) {
                          setVoucher("");
                          setVoucherDiscount(0);
                          setVoucherPercent(0);
                          setVoucherCode("");
                          setShippingPrice(0);
                        } else {
                          if (province === 12) {
                            setShippingPrice(0);
                          } else {
                            setShippingPrice(30000);
                          }
                        }
                        // owner === "kh"
                        //   ? setDiscount(
                        //       e.target.value * productData.product_price * 0.3
                        //     )
                        //   : setDiscount(0);

                        for (let i = 1; i <= num; i++) {
                          clothIdList.push({ value: "" });
                          clothImageList.push({
                            value: LOCAL_PATH + "images/loading.gif",
                          });
                          clothQuantityList.push({ value: 0 });
                          fileList.push({ value: "" });
                          imageList.push({
                            value: LOCAL_PATH + "images/upload-icon2.png",
                          });
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={increment}
                    >
                      <Icon>add</Icon>
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Divider sx={{ margin: "10px 0px" }} />
              <Grid container>
                <Grid item xs={8}>
                  <Typography sx={{ fontSize: "14px" }}>T???m t??nh</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: "14px", float: "right" }}>
                    {price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography sx={{ fontSize: "14px" }}>Gi???m gi??</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: "14px", float: "right" }}>
                    {discount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Grid>

                {qty > 1 ? null : (
                  <>
                    <Grid item xs={8}>
                      <Typography sx={{ fontSize: "14px" }}>
                        Voucher gi???m ({voucherPercent} %)
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: "14px", float: "right" }}>
                        {voucherDiscount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Typography>
                    </Grid>
                  </>
                )}
                <Grid item xs={8}>
                  <Typography sx={{ fontSize: "14px" }}>
                    Ph?? v???n chuy???n
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: "14px", float: "right" }}>
                    {shippingPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Grid>
                {qty > 1 ? null : (
                  <Grid item xs={12} sx={center}>
                    <Input
                      placeholder="Nh???p m?? gi???m gi??"
                      inputProps={{ "aria-label": "description" }}
                      sx={{
                        width: "95%",
                        backgroundColor: "#fff",
                        padding: "5px",
                        border: "1px solid #d3d3d3",
                      }}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <IconButton onClick={handleClickVoucher}>
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
              <Divider sx={{ margin: "10px 0px" }} />
              <Grid container>
                <Grid item xs={8}>
                  <Typography sx={{ fontSize: "14px" }}>T???ng c???ng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: "14px", float: "right" }}>
                    {(
                      price -
                      discount -
                      voucherDiscount +
                      shippingPrice
                    ).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ margin: "10px 0px" }} />
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                X??c nh???n
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Dialog>
  );
}
