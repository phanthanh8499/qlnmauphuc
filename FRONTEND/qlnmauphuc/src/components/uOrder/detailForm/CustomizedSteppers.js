import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlarmIcon from "@mui/icons-material/Alarm";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import { Typography } from "@mui/material";

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
  
  const { activeId, data } = props;
  


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
      label: "Ch??? x??c nh???n",
      date: formatDate(data.order_startdate),
    },
    {
      label: "???? x??c nh???n",
      date:
        data.order_processingtime1 === null
          ? null
          : formatDate(data.order_processingtime1),
    },
    {
      label: "??ang l???y v???i",
      date:
        data.order_processingtime2 === null
          ? null
          : formatDate(data.order_processingtime2),
    },
    {
      label: "??ang may",
      date:
        data.order_processingtime3 === null
          ? null
          : formatDate(data.order_processingtime3),
    },
    {
      label: "???? may xong",
      date:
        data.order_processingtime4 === null
          ? null
          : formatDate(data.order_processingtime4),
    },
    {
      label: "??ang v???n chuy???n",
      date:
        data.order_shippingtime === null
          ? null
          : formatDate(data.order_shippingtime),
    },
    {
      label: "Ho??n t???t",
      date: data.order_enddate === null ? null : formatDate(data.order_enddate),
    },
  ];

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeId === 10 ? -1 : activeId}
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
      {/* {activeStep === steps.length ? (
        <React.Fragment>
         
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )} */}
    </Stack>
  );
}
