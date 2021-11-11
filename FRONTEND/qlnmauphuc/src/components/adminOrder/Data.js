import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { getOrderData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintIcon from "@mui/icons-material/Print";
import {
  MyFormControl,
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
import { format } from "date-fns";
import {
  CustomNoRowsOverlay,
  useStylesAntDesign,
} from "../utility/DataGridTheme";
import { useReactToPrint } from "react-to-print";
import { INFO } from "../../constants/Constants";

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

const MyButton = styled(Button)`
  text-transform: none;
  border-radius: 25px;
`;

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { data, startD, endD } = props;

  const dispatch = useDispatch();
  const [dataRender, setDataRender] = useState([]);
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
    setDataBackup(data);
    setLoading(false);
  }, [data]);

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
  const [orderId, setOrderId] = useState("");
  const [orderIdList, setOrderIdList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [cancelForm, setCancelForm] = useState(false);

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
      field: "os_name",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        return params.value === "Đang đợi xử lý" ? (
          <MyButton variant="outlined" color="warning" fullWidth>
            Đang đợi xử lý
          </MyButton>
        ) : params.value === "Đợi thợ may" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đợi thợ may
          </MyButton>
        ) : params.value === "Đang lấy vải" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đang lấy vải
          </MyButton>
        ) : params.value === "Đang may" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đang may
          </MyButton>
        ) : params.value === "Đã may xong" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            Đã may xong
          </MyButton>
        ) : params.value === "Đang vận chuyển" ? (
          <MyButton variant="outlined" color="secondary" fullWidth>
            Đang vận chuyển
          </MyButton>
        ) : params.value === "Hoàn tất" ? (
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
    { field: "order_customeraddress", headerName: "Địa chỉ", width: 450 },
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

  const exportFile = () => {
    var list = JSON.parse(JSON.stringify(dataRender));
    list.map((item) => {
      delete item.id;
      delete item.od_productid;
      delete item.od_clothid;
      delete item.order_wardid;
      delete item.order_districtid;
      delete item.order_provinceid;
      delete item.order_paymentid;
      delete item.order_shippingid;
      delete item.order_tailorid;
      delete item.order_statusid;
      delete item.order_userid;
      delete item.product_typeid;
      delete item.product_image1;
      return item;
    });
    const ws = XLSX.utils.json_to_sheet(list);
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSDonHang " + now + ".xlsx");
  };

  const handleChangeProvince = async (e) => {
    setProvince(e.target.value);
    const { data } = await axios.get(`/getDistrict.${e.target.value}`);
    setDistrictData(data);
    setWardData([]);
    setDistrict(0);
    setWard(0);
  };
  const handleChangeDistrict = async (e) => {
    setDistrict(e.target.value);
    const { data } = await axios.get(`/getWard.${province}&${e.target.value}`);
    setWardData(data);
    setWard(0);
  };
  const handleChangeWard = (e) => {
    setWard(e.target.value);
  };

  const renderAddressForm = () => {
    return (
      <>
        <Grid item xs={2} sx={{ ml: 0.5 }}>
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

  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const [endDate, setEndDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 0))
  );

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const [dataBackup, setDataBackup] = useState();
  const [count, setCount] = useState(0)
  const handleClickSearch = () => {
    if (
      Date.parse(endDate) >
      Date.parse(new Date(new Date().setHours(23, 59, 59, 0)))
    ) {
      enqueueSnackbar("Không được chọn ngày lớn hơn ngày hiện tại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (Date.parse(startDate) > Date.parse(endDate)) {
      enqueueSnackbar("Ngày bắt đầu không được lớn hơn ngày kết thúc", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      const dataSend = {
        id: 0,
        provinceId: province,
        districtId: district,
        wardId: ward,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      };
      dispatch(getOrderData(dataSend));
      setCount(count+1);
    }
  };

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
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
      setDataRender(dataBackup);
    }
  };

  const componentRef = useRef();
  const subtotal = (items) => {
    return items.map((item) => item.order_total).reduce((sum, i) => sum + i, 0);
  }
  const total = subtotal(dataRender)
  const now = new Date();
  const pageStyle = `
   @page {margin: 10px; size: 1240px 700px}
   @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }
  @page {
    size: auto;
    margin: 20mm;
  }
`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "BaoCaoDonHang" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

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
                  <Grid item xs={2} align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClickSearch}
                      sx={{mr: 0.5}}
                    >
                      Tìm kiếm
                    </Button>
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
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrint()}
                  sx={{ ml: 0.5 }}
                >
                  <PrintIcon />
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
              height: 450,
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
          <Grid container sx={{ display: "none" }}>
            <div ref={componentRef}>
              <Grid container>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontWeight: 600 }}>{INFO.name}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 600 }}>Mẫu in: B111</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ngày in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    Báo cáo kết quả thống kê đơn hàng
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    {count === 0
                      ? `(Từ ngày: ${format(
                          startD,
                          "dd-MM-yyyy"
                        )} --- Đến ngày: 
                    ${format(endD, "dd-MM-yyyy")})`
                      : `(Từ ngày: ${format(
                          startDate,
                          "dd-MM-yyyy"
                        )} --- Đến ngày: 
                    ${format(endDate, "dd-MM-yyyy")})`}
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn hàng</TableCell>
                      <TableCell align="center">Ngày tạo</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="center">Tên khách hàng</TableCell>
                      <TableCell align="center">Địa chỉ</TableCell>
                      <TableCell align="center">Tên sản phẩm</TableCell>
                      <TableCell align="center">Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.od_orderid}
                          </TableCell>
                          <TableCell align="center">
                            {formatDate(row.order_startdate)}
                          </TableCell>
                          <TableCell align="left">{row.os_name}</TableCell>
                          <TableCell align="left">{row.tailor_name}</TableCell>
                          <TableCell align="left">
                            {row.order_customeraddress}
                          </TableCell>
                          <TableCell align="left">{row.product_name}</TableCell>
                          <TableCell align="right">
                            {row.order_total.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          Tổng cộng:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>

        </>
      )}
    </Grid>
  );
}
