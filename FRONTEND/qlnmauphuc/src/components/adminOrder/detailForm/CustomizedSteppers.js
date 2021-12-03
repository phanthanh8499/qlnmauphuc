import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import { useDispatch } from "react-redux";
import { processingOrder } from "../../../redux/Action";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import PrintIcon from "@mui/icons-material/Print";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0008ff",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0008ff",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#ffffff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#ffffff",
    color: "#0400ff",
    boxShadow: "0 4px 10px 0 #1976d2",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#ffffff",
    color: "#0400ff",
    boxShadow: "0 0 0 1px #1976d2 inset",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CropRotateIcon />,
    2: <FactCheckOutlinedIcon />,
    3: <AlarmIcon />,
    4: <AlarmIcon />,
    5: <AlarmOnIcon />,
    6: <LocalShippingIcon />,
    7: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

export default function CustomizedSteppers(props) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { enqueueSnackbar } = useSnackbar();
  const { activeId, id, data, handlePrint, userid } = props;
  useEffect(() => {
    setActiveStep(activeId);
  }, [activeId]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    const today = new Date();

    if (data.order_statusid === 2) {
      if (data.cloth_typeid === "VCKH") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch(
          processingOrder({
            order_statusid: activeStep + 1,
            od_orderid: id,
            date: format(today, "yyyy-MM-dd HH:mm:ss"),
            cloth_quantity: data.cloth_quantity,
            cloth_typeid: data.cloth_typeid,
            od_clothid: data.od_clothid,
            customername: data.order_customername,
            customeremail: data.order_customeremail,
            order_shippingid: data.order_shippingid,
          })
        );
      } else if (
        data.product_typeid === "SFF" ||
        data.product_typeid === "SFM"
      ) {
        if (data.cloth_quantity >= 6) {
          dispatch(
            processingOrder({
              order_statusid: activeStep + 1,
              od_orderid: id,
              date: format(today, "yyyy-MM-dd HH:mm:ss"),
              cloth_quantity: data.cloth_quantity - 6,
              cloth_typeid: data.cloth_typeid,
              od_clothid: data.od_clothid,
              customername: data.order_customername,
              customeremail: data.order_customeremail,
              order_shippingid: data.order_shippingid,
            })
          );
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          enqueueSnackbar("Không đủ vải để tiến hành may", {
            variant: "error",
            autoHideDuration: 2000,
          });
          return false;
        }
      } else {
        if (data.cloth_quantity >= 2) {
          dispatch(
            processingOrder({
              order_statusid: activeStep + 1,
              od_orderid: id,
              date: format(today, "yyyy-MM-dd HH:mm:ss"),
              cloth_quantity: data.cloth_quantity - 2,
              cloth_typeid: data.cloth_typeid,
              od_clothid: data.od_clothid,
              order_shippingid: data.order_shippingid,
              customername: data.order_customername,
              customeremail: data.order_customeremail,
            })
          );
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          enqueueSnackbar("Không đủ vải để tiến hành may", {
            variant: "error",
            autoHideDuration: 2000,
          });
          return false;
        }
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      dispatch(
        processingOrder({
          order_statusid: activeStep + 1,
          od_orderid: id,
          date: format(today, "yyyy-MM-dd HH:mm:ss"),
          customername: data.order_customername,
          customeremail: data.order_customeremail,
          log_date: format(today, "yyyy-MM-dd HH:mm:ss"),
          log_userid: userid,
          log_eventtypeid: "POF",
          order_shippingid: data.order_shippingid,
        })
      );
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const steps = [
    {
      label: "Chờ xác nhận",
      date: formatDate(data.order_startdate),
    },
    {
      label: "Đã xác nhận",
      date:
        data.order_processingtime1 === null
          ? null
          : formatDate(data.order_processingtime1),
    },
    {
      label: "Đang lấy vải",
      date:
        data.order_processingtime2 === null
          ? null
          : formatDate(data.order_processingtime2),
    },
    {
      label: "Đang may",
      date:
        data.order_processingtime3 === null
          ? null
          : formatDate(data.order_processingtime3),
    },
    {
      label: "Đã may xong",
      date:
        data.order_processingtime4 === null
          ? null
          : formatDate(data.order_processingtime4),
    },
    {
      label: "Đang vận chuyển",
      date:
        data.order_shippingtime === null
          ? null
          : formatDate(data.order_shippingtime),
    },
    {
      label: "Hoàn tất",
      date: data.order_enddate === null ? null : formatDate(data.order_enddate),
    },
  ];

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep === 10 ? -1 : activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              optional={
                step.date ? (
                  <Typography variant="caption">{step.date}</Typography>
                ) : null
              }
              sx={{ textAlign: "center" }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container sx={{ margin: "0px !important" }}>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePrint()}
          >
            <PrintIcon/>
          </Button>
        </Grid>
        {activeStep === steps.length - 1 ? (
          // <React.Fragment>
          //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          //     <Box sx={{ flex: "1 1 auto" }} />
          //     <Button onClick={handleReset}>Reset</Button>
          //   </Box>
          // </React.Fragment>
          <></>
        ) : activeStep === 10 ? (
          <></>
        ) : (
          <Grid item xs={2}>
            <ButtonGroup>
              <Button
                color="error"
                disabled={
                  activeStep === 0 || activeStep === 1 || activeStep === 2
                }
                onClick={handleBack}
              >
                Back
              </Button>

              <Button onClick={handleNext} disabled={activeStep === 1}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </ButtonGroup>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}
