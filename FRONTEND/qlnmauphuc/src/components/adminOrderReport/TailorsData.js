import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { INFO, LOCAL_PATH, XOA_HINH_ANH } from "../../constants/Constants";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Copyright,
  MyFormControl,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import XLSX from "xlsx";
import AddIcon from "@mui/icons-material/Add";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
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
import { getTailorsData, setDateData } from "../../redux/Action";

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px 5px 0px !important",
  },
}));

// const MyButton = styled(Button)`
//   text-transform: none;
//   border-radius: 25px;
// `;

const MyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
}));

export default function TailorsData(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const antDesignClasses = useStylesAntDesign();
  const dispatch = useDispatch();
  const [dataRender, setDataRender] = useState();
  const { data, isCcn } = props;
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

  


  const orderReport = useSelector((state) => state.orderReport);
  const { loadingTD, loadingD, tailorsData, dateData } = orderReport;
  const [startD, setStartD] = useState(new Date())
  const [endD, setEndD] = useState(new Date())
  useEffect(() => {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(now);
    var endDate = new Date(now);
    if (now.toLocaleDateString("en-us", { weekday: "long" }) === "Sunday") {
      startDate.setDate(startDate.getDate() - startDate.getDay() - 6);
      endDate.setDate(endDate.getDate() - endDate.getDay());
      endDate.setHours(23, 59, 59, 0);
    } else {
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
      endDate.setHours(23, 59, 59, 0);
    }
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      total_order: 5,
    };
    setStartDate(startDate);
    setEndDate(endDate);
    dispatch(
      setDateData({ startDate: startDate, endDate: endDate })
    );
    dispatch(getTailorsData(dataSend));
  }, []);

  useEffect(() => {
    setDataRender(tailorsData);
    setLoading(false)
  }, [tailorsData]);

  const rows = dataRender;

  const [userId, setUserId] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [changeForm, setChangeForm] = useState(false);
  const [userIdList, setUserIdList] = useState([]);
  const openAddForm = () => {
    setAddForm(true);
  };
  const closeAddForm = () => {
    setAddForm(false);
    dispatch({ type: XOA_HINH_ANH });
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

  const openChangeForm = () => {
    setChangeForm(true);
  };
  const closeChangeForm = () => {
    setChangeForm(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    setAnchorEl(null);
    if (userIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn tài khoản cần xoá", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openDeleteForm();
    }
  };

  const handleClickChange = () => {
    setAnchorEl(null);
    if (userIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn tài khoản cần thay đổi", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openChangeForm();
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
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

  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));


  const columns = [
    {
      field: "user_avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <Avatar src={LOCAL_PATH + params.value.substring(2)} />;
      },
    },
    { field: "user_username", headerName: "UserName", width: 150 },
    { field: "user_lastname", headerName: "Họ", width: 200 },
    { field: "user_firstname", headerName: "Tên", width: 130 },
    { field: "total_order", headerName: "Chỉ tiêu may", width: 170, align: 'center' },
    { field: "processing_order", headerName: "Đang may", width: 150, align: 'center' },
    { field: "complete_order", headerName: "Hoàn thành", width: 170, align: 'center' },
    { field: "is_complete", headerName: "Đạt chỉ tiêu", width: 150,
      renderCell: (params) => {
        if(params.value === true){
          return <MyButton variant="outlined" color="primary" fullWidth>Đạt</MyButton>
        } else {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              Không
            </MyButton>
          );
        }
      } },

    // {
    //   field: "id",
    //   headerName: "Hành động",
    //   sortable: false,
    //   width: 110,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     const handleClickEdit = () => {
    //       openDetailForm();
    //       setUserId(params.value);
    //     };

    //     const handleClickDelete = () => {
    //       openDeleteForm();
    //       setUserId(params.value);
    //     };

    //     return (
    //       <ButtonGroup>
    //         <IconButton onClick={handleClickEdit} size="large">
    //           <VisibilityIcon />
    //         </IconButton>

    //         <IconButton onClick={handleClickDelete} size="large">
    //           <DeleteOutlineIcon color="error" />
    //         </IconButton>
    //       </ButtonGroup>
    //     );
    //   },
    // },
  ];

  const exportFile = () => {
    const list = [];
    for(let i=0; i<dataRender.length; i++){
      list.push({
          "STT": i+1,
          "Username": dataRender[i].user_username,
          "Họ": dataRender[i].user_lastname,
          "Tên": dataRender[i].user_firstname,
          "Chỉ tiêu": dataRender[i].total_order,
          "Đang may": dataRender[i].processing_order,
          "Hoàn thành": dataRender[i].complete_order,
          "Đạt chỉ tiêu": dataRender[i].is_complete === true ? "Đạt" : "Không"
      })
    }
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "BaoCaoTienDoMay " + now + ".xlsx");
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
        {isCcn ? null : (
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
        )}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={2} sx={isCcn ? { ml: 0.5 } : null}>
            <DesktopDatePicker
              label="Từ ngày"
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={2}>
            <DesktopDatePicker
              label="Đến ngày"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={handleChangeEndDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
        </LocalizationProvider>
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
  const [count, setCount] = useState(0);
  const handleClickSearch = () => {
    let temp = [...data];
    if (province !== 0) {
      temp = temp.filter((data) => data.ward_provinceid === province);
    }
    if (district !== 0) {
      temp = temp.filter((data) => data.ward_districtid === district);
    }
    if (ward !== 0) {
      temp = temp.filter((data) => data.user_wardid === ward);
    }
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
      temp = temp.filter(
        (data) =>
          Date.parse(data.user_date) >= Date.parse(startDate) &&
          Date.parse(data.user_date) <= Date.parse(endDate)
      );
      console.log("ok ");
    }
    setDataRender(temp);
    setDataBackup(temp);
    setCount(count + 1);
  };

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          removeAccents(data.user_typeid).includes(removeAccents(string)) ||
          removeAccents(data.user_username).includes(removeAccents(string)) ||
          removeAccents(data.user_lastname).includes(removeAccents(string)) ||
          removeAccents(data.user_firstname).includes(removeAccents(string)) ||
          removeAccents(
            data.user_lastname + " " + data.user_firstname
          ).includes(removeAccents(string)) ||
          removeAccents(data.user_address).includes(removeAccents(string)) ||
          removeAccents(data.user_status).includes(removeAccents(string)) ||
          formatDate(data.user_date).toString().includes(string) ||
          data.user_tel.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const liveSearch2 = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          removeAccents(data.user_typeid).includes(removeAccents(string)) ||
          removeAccents(data.user_username).includes(removeAccents(string)) ||
          // removeAccents(data.user_lastname).includes(removeAccents(string)) ||
          // removeAccents(data.user_firstname) .includes(removeAccents(string)) ||
          // removeAccents(data.user_lastname + " " + data.user_firstname).includes(removeAccents(string)) ||
          // removeAccents(data.user_address).includes(removeAccents(string)) ||
          removeAccents(data.user_status).includes(removeAccents(string)) ||
          formatDate(data.user_date).toString().includes(string) ||
          data.user_tel.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const componentRef = useRef();
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
    documentTitle: "TinhTrangMay" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  const [rowSelected, setRowSelected] = useState();

  return (
    <Grid container>
      {loadingTD || loadingD || loading ? (
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
              <Grid item xs={9}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={exportFile}
                  sx={{ ml: 0.5 }}
                >
                  <SaveAltIcon sx={{ mr: 0.5 }} /> Xuất Excel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrint()}
                  sx={{ ml: 0.5 }}
                >
                  <PrintIcon sx={{ mr: 0.5 }} /> Tạo bản in
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={isCcn ? liveSearch2 : liveSearch}
                  />
                </Search>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              height: 445,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={6}
              className={antDesignClasses.root}
              checkboxSelection
              disableSelectionOnClick
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              onRowClick={(param) =>
                setRowSelected({
                  id: param.row.id,
                  user_username: param.row.user_username,
                })
              }
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = dataRender.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setUserIdList(selectedRowData);
              }}
            />
          </Grid>
          <Grid container sx={{ display: "none" }}>
            <div ref={componentRef}>
              <Grid container>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontWeight: 600 }}>{INFO.name}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 600 }}>Mẫu in: B116</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ngày in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    Báo cáo tình trạng may của nhân viên
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    (Từ ngày: {format(dateData.startDate, "dd/MM/yyyy")} ---
                    Đến ngày: {format(dateData.endDate, "dd/MM/yyyy")})
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell align="center">UserName</TableCell>
                      <TableCell align="center">Họ</TableCell>
                      <TableCell align="center">Tên</TableCell>
                      <TableCell align="center">Chỉ tiêu may</TableCell>
                      <TableCell align="center">Đang may</TableCell>
                      <TableCell align="center">Hoàn thành</TableCell>
                      <TableCell align="center">Đạt chỉ tiêu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            <Avatar
                              src={LOCAL_PATH + row.user_avatar.substring(2)}
                            />
                          </TableCell>

                          <TableCell align="left">
                            {row.user_username}
                          </TableCell>
                          <TableCell align="left">
                            {row.user_lastname}
                          </TableCell>
                          <TableCell align="left">
                            {row.user_firstname}
                          </TableCell>
                          <TableCell align="center">
                            {row.total_order}
                          </TableCell>
                          <TableCell align="left">
                            {row.processing_order}
                          </TableCell>
                          <TableCell align="left">
                            {row.complete_order}
                          </TableCell>
                          <TableCell align="left">
                            {row.is_complete === true ? "Đạt" : "Không đạt"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
