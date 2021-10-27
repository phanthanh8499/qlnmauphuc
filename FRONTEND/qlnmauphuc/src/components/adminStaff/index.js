import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import { Badge, Button, ButtonGroup, CircularProgress, Divider, Grid, IconButton, Paper } from "@mui/material";
import { getClothData, getProductData, getStaffData, getUserData } from "../../redux/Action";
import { XOA_HINH_ANH } from "../../constants/Constants";
import { createTheme, styled } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";

const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: '0px 0px -5px 0px !important',
  },
}));

const defaultTheme = createTheme();
const useStyles2 = makeStyles(
  (theme) =>
    createStyles({
      root: {
        flexDirection: "column",
        "& .ant-empty-img-1": {
          fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
        },
        "& .ant-empty-img-2": {
          fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
        },
        "& .ant-empty-img-3": {
          fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
        },
        "& .ant-empty-img-4": {
          fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
        },
        "& .ant-empty-img-5": {
          fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
          fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
        },
      },
      label: {
        marginTop: theme.spacing(1),
      },
    }),
  { defaultTheme }
);

const useStylesAntDesign = makeStyles(
  (theme) => ({
    root: {
      border: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
      color:
        theme.palette.mode === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.85)",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-cell": {
        color:
          theme.palette.mode === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.85)",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor:
            theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
        },
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
          borderRight: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
          }`,
        },
        "& .MuiDataGrid-cell": {
          color:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,.85)"
              : "rgba(255,255,255,0.65)",
        },
        "& .MuiPaginationItem-root": {
          borderRadius: 0,
        },
        "& .MuiCheckbox-root svg": {
          width: 16,
          height: 16,
          backgroundColor: "transparent",
          border: `1px solid ${
            theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
          }`,
          borderRadius: 2,
        },
        "& .MuiCheckbox-root svg path": {
          display: "none",
        },
        "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        },
        "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
          position: "absolute",
          display: "table",
          border: "2px solid #fff",
          borderTop: 0,
          borderLeft: 0,
          transform: "rotate(45deg) translate(-50%,-50%)",
          opacity: 1,
          transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
          content: '""',
          top: "50%",
          left: "39%",
          width: 5.71428571,
          height: 9.14285714,
        },
        "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
          {
            width: 8,
            height: 8,
            backgroundColor: "#1890ff",
            transform: "none",
            top: "39%",
            border: 0,
          },
      },
    },
  }),
  { defaultTheme }
);

function CustomNoRowsOverlay() {
  const classes = useStyles2();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Rows</div>
    </GridOverlay>
  );
}

export default function AdminStaff() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const antDesignClasses = useStylesAntDesign();
  const users = useSelector((state) => state.users);
  const { loadingStaff, staffData} = users;
  const [loadingState, setLoadingState] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStaffData());
  }, []);

  const [nv, setNv] = useState([]);
  const [qt, setQt] = useState([]);

  useEffect(() => {
   
    setNv(staffData.filter((item) => item.user_typeid === "NV"));
  
    setQt(staffData.filter((item) => item.user_typeid === "AD"));
    setLoadingState(false);
  }, [staffData]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  return (
    <Grid container component={Paper}>
      {loadingStaff || loadingState ? (
        <Grid
          item
          xs={12}
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "570px",
            backgroundColor: "rgb(0 0 0 / 2%);",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <TabContext value={value}>
            <Grid item xs={12} className={classes.topBar}>
              <Grid container>
                <Grid item xs={9}>
                  <Box sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <MyTab
                        label={
                          <MyBadge badgeContent={nv.length} color="primary">
                            Nhân viên
                          </MyBadge>
                        }
                        value="1"
                      />

                      <MyTab
                        label={
                          <MyBadge badgeContent={qt.length} color="primary">
                            Quản trị
                          </MyBadge>
                        }
                        value="2"
                      />
                    </TabList>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "0px 0px 5px 0px" }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={nv} isNv />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={qt} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
