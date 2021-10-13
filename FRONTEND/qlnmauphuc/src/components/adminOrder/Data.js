import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import {
  DataGrid,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { getOrderData, getProductData } from "../../redux/Action";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { cancelOrder, deleteOrder } from "../../redux/Action";
import {
  DateTextField,
  MyFormControl,
  MyTextField,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import CancelForm from "./cancelForm/cancelForm";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport variant="outlined" utf8WithBom={true} />
      {/* <Button variant="outlined" color="primary">
      </Button> */}
    </GridToolbarContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px 5px 0px !important",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
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

const MyButton = styled(Button)`
  text-transform: none;
  border-radius: 25px;
`;

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { data } = props;
  const dispatch = useDispatch();
  const [dataRender, setDataRender] = useState([]);
  const [dataExport, setDataExport] = useState([]);
  const [loading, setLoading] = useState(true);

  const [province, setProvince] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState(0);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    async function getProvinceData() {
      const { data } = await axios.get(`/getProvince`);
      setProvinceData(data);
    }
    getProvinceData();
  }, []);
  useEffect(() => {
    setDataRender(data);
    setDataExport(data);
    setLoading(false);
  }, [data]);

  console.log(dataRender);
  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = data.filter((data) => {
        return (
          data.od_orderid.includes(string.toLowerCase()) ||
          removeAccents(data.order_customername)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.os_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          formatDate(data.order_startdate).includes(string) ||
          data.order_total.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(data);
    }
  };

  const rows = dataRender;
  const [orderId, setOrderId] = useState("");
  const [orderIdList, setOrderIdList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [cancelForm, setCancelForm] = useState(false);

  const openAddForm = () => {
    setAddForm(true);
  };
  const closeAddForm = () => {
    setAddForm(false);
  };

  const openDetailForm = () => {
    setDetailForm(true);
  };
  const closeDetailForm = () => {
    setDetailForm(false);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };
  const closeDeleteForm = () => {
    setDeleteForm(false);
  };

  const openCancelForm = () => {
    setCancelForm(true);
  };
  const closeCancelForm = () => {
    setCancelForm(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickEdit = () => {
    setAnchorEl(null);
    console.log(orderIdList);
  };
  const handleClickCancel = () => {
    setAnchorEl(null);
    if (orderIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn đơn hàng cần huỷ", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openCancelForm();
    }
  };
  const handleClickDelete = () => {
    setAnchorEl(null);
    if (orderIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn đơn hàng cần xoá", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openDeleteForm();
    }
  };

  const renderForm = () => {
    if (addForm) {
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(dataRender[Object.keys(dataRender).sort().pop()].id)}
        ></AddForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={orderId}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={orderId}
          listId={orderIdList}
        ></DeleteForm>
      );
    }
    if (cancelForm) {
      return (
        <CancelForm
          open={cancelForm}
          onClose={closeCancelForm}
          id={orderId}
          listId={orderIdList}
        ></CancelForm>
      );
    }
  };

  const columns = [
    { field: "od_orderid", headerName: "Mã đơn hàng", width: 350 },

    {
      field: "order_startdate",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "order_statusid",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        return params.value === 0 ? (
          <MyButton variant="outlined" color="warning" fullWidth>
            Đang đợi xử lý
          </MyButton>
        ) : params.value === 1 ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đợi thợ may
          </MyButton>
        ) : params.value === 2 ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đang lấy vải
          </MyButton>
        ) : params.value === 3 ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đang may
          </MyButton>
        ) : params.value === 4 ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đã may xong
          </MyButton>
        ) : params.value === 5 ? (
          <MyButton variant="outlined" color="secondary" fullWidth>
            Đang vận chuyển
          </MyButton>
        ) : params.value === 6 ? (
          <MyButton variant="outlined" color="success" fullWidth>
            Hoàn tất
          </MyButton>
        ) : (
          <MyButton variant="outlined" color="error" fullWidth>
            Đã huỷ
          </MyButton>
        );
      },
    },
    { field: "order_customername", headerName: "Tên khách hàng", width: 200 },
    { field: "product_name", headerName: "Tên sản phẩm", width: 300 },
    {
      field: "order_total",
      headerName: "Tổng tiên",
      width: 150,
      type: "number",
    },

    {
      field: "id",
      headerName: "Hành động",
      sortable: false,
      width: 110,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setOrderId(
            dataRender.filter((item) => item.id === params.value)[0].od_orderid
          );
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setOrderId(
            dataRender.filter((item) => item.id === params.value)[0].od_orderid
          );
        };

        return (
          <ButtonGroup variant="outlined">
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete} size="large">
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const CustomToolbar = () => {
    return <GridToolbarContainer></GridToolbarContainer>;
  };

  const exportFile = () => {
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSDonHang.xlsx");
  };

  const handleChangeProvince = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(`/getDistrict.${e.target.value}`);
    setDistrictData(data);
    setWardData([]);
    setDistrict();
    setWard();
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
        <Grid item xs={2} sx={{ml:0.5}}>
          <MyFormControl fullWidth>
            <InputLabel id="province-select-label">Tỉnh/Thành</InputLabel>
            <Select
              labelId="province-select-label"
              id="province-simple-select"
              defaultValue={province}
              label="Tỉnh/Thành"
              onChange={handleChangeProvince}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {provinceData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.province_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={2}>
          <MyFormControl fullWidth>
            <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-simple-select"
              defaultValue={district}
              label="Quận/Huyện"
              onChange={handleChangeDistrict}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              {districtData.map((value, key) => (
                <MenuItem value={value.id} key={key}>
                  {value.district_prefix} {value.district_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={2}>
          <MyFormControl fullWidth>
            <InputLabel id="ward-select-label">Xã/Phường</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-simple-select"
              defaultValue={ward}
              label="Xã/Phường"
              onChange={handleChangeWard}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
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

  const [startDate, setStartDate] = useState(new Date());

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const [endDate, setEndDate] = useState(new Date());

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Grid container>
      {loading ? (
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
          <Grid item xs={12} sx={{ marginBottom: "5px" }}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={10}>
                    <Grid container spacing={1}>
                      {renderAddressForm()}

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid item xs={2}>
                          <DesktopDatePicker
                            label="Từ ngày"
                            inputFormat="dd/MM/yyyy"
                            value={startDate}
                            onChange={handleChangeStartDate}
                            renderInput={(params) => (
                              <TextField size="small" {...params} />
                            )}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <DesktopDatePicker
                            label="Đến ngày"
                            inputFormat="dd/MM/yyyy"
                            value={endDate}
                            onChange={handleChangeEndDate}
                            renderInput={(params) => (
                              <TextField size="small" {...params} />
                            )}
                          />
                        </Grid>
                      </LocalizationProvider>

                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8}>
                        <Button variant="outlined" color="primary">Tìm kiếm</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={exportFile}
                  sx={{ ml: 0.5 }}
                >
                  <SaveAltIcon />
                </Button>
                <Button
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClickMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ ml: 0.5 }}
                >
                  Hành động
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleClickEdit} disableRipple>
                    <EditIcon />
                    Cập nhật trạng thái
                  </MenuItem>
                  <MenuItem onClick={handleClickCancel} disableRipple>
                    <BlockIcon />
                    Huỷ
                  </MenuItem>
                  <MenuItem onClick={handleClickDelete} disableRipple>
                    <CancelIcon />
                    Xoá
                  </MenuItem>
                </StyledMenu>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={liveSearch}
                  />
                </Search>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              height: 460,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={dataRender}
              columns={columns}
              pageSize={6}
              className={antDesignClasses.root}
              checkboxSelection
              disableSelectionOnClick
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = dataRender.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setOrderIdList(selectedRowData);
              }}
            />
          </Grid>

          {renderForm()}
        </>
      )}
    </Grid>
  );
}
