import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
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
import ChangeForm from "./changeForm/changeForm";
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

export default function Data(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const antDesignClasses = useStylesAntDesign();
  const dispatch = useDispatch();
  const [dataRender, setDataRender] = useState();
  const { data, isCcn, startD, endD } = props;
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
      enqueueSnackbar("Vui l??ng ch???n t??i kho???n c???n xo??", {
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
      enqueueSnackbar("Vui l??ng ch???n t??i kho???n c???n thay ?????i", {
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
      .replace(/??/g, "d")
      .replace(/??/g, "D")
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

  const renderForm = () => {
    if (addForm) {
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(
            dataRender[
              Object.keys(dataRender)
                .sort(function (a, b) {
                  if (a.id >= b.id) return a;
                })
                .pop()
            ].id
          )}
          userid={userInfo.id}
        ></AddForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={parseInt(userId)}
          userid={userInfo.id}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={parseInt(userId)}
          listId={userIdList}
          userid={userInfo.id}
          dataReq={rowSelected}
        ></DeleteForm>
      );
    }
    if (changeForm) {
      return (
        <ChangeForm
          open={changeForm}
          onClose={closeChangeForm}
          id={parseInt(userId)}
          listId={userIdList}
          userid={userInfo.id}
          dataReq={rowSelected}
        ></ChangeForm>
      );
    }
  };

  const columns = [
    {
      field: "user_avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <Avatar src={LOCAL_PATH + params.value.substring(2)} />;
      },
    },
    { field: "user_username", headerName: "UserName", width: 100 },
    { field: "user_lastname", headerName: "H???", width: 200 },
    { field: "user_firstname", headerName: "T??n", width: 130 },
    {
      field: "user_tel",
      headerName: "S??? ??i???n tho???i",
      width: 140,
      renderCell: (params) => {
        const formatTel = (text) => {
          return text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        };
        return formatTel(params.value);
      },
    },
    { field: "user_address", headerName: "?????a ch???", width: 500 },
    { field: "user_email", headerName: "Email", width: 300 },
    {
      field: "user_status",
      headerName: "Tr???ng th??i",
      width: 150,
      renderCell: (params) => {
        if (params.value === "active") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Ho???t ?????ng
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              Bi kho??
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_typeid",
      headerName: "Lo???i ng?????i d??ng",
      width: 150,
      renderCell: (params) => {
        if (params.value === "AD") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Admin
            </MyButton>
          );
        }
        if (params.value === "NV") {
          return (
            <MyButton variant="outlined" color="secondary" fullWidth>
              Nh??n vi??n
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              Kh??ch h??ng
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_date",
      headerName: "Ng??y t???o",
      width: 180,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "id",
      headerName: "H??nh ?????ng",
      sortable: false,
      width: 110,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setUserId(params.value);
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setUserId(params.value);
        };

        return (
          <ButtonGroup>
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

  const columns2 = [
    {
      field: "user_avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <Avatar src={LOCAL_PATH + params.value.substring(2)} />;
      },
    },
    { field: "user_username", headerName: "UserName", width: 100 },
    {
      field: "user_tel",
      headerName: "S??? ??i???n tho???i",
      width: 140,
      renderCell: (params) => {
        const formatTel = (text) => {
          return text.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        };
        return formatTel(params.value);
      },
    },
    {
      field: "user_status",
      headerName: "Tr???ng th??i",
      width: 150,
      renderCell: (params) => {
        if (params.value === "active") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Ho???t ?????ng
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              Bi kho??
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_typeid",
      headerName: "Lo???i ng?????i d??ng",
      width: 150,
      renderCell: (params) => {
        if (params.value === "AD") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Admin
            </MyButton>
          );
        }
        if (params.value === "NV") {
          return (
            <MyButton variant="outlined" color="secondary" fullWidth>
              Nh??n vi??n
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              Kh??ch h??ng
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_date",
      headerName: "Ng??y t???o",
      width: 180,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "id",
      headerName: "H??nh ?????ng",
      sortable: false,
      width: 110,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setUserId(params.value);
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setUserId(params.value);
        };

        return (
          <ButtonGroup>
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
    var list = [];
    for (let i = 0; i < dataRender.length; i++) {
      list.push({
        STT: i + 1,
        Username: dataRender[i].user_username,
        H???: dataRender[i].user_lastname,
        T??n: dataRender[i].user_firstname,
        "S??? ??i???n tho???i": dataRender[i].user_tel,
        "?????a ch???": dataRender[i].user_address,
        Email: dataRender[i].user_email,
        "Ng??y t???o": formatDate(dataRender[i].user_date),
        "Tr???ng th??i": dataRender[i].user_status === "active" ? "Ho???t ?????ng" : "???? kho??",
      });
    }
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSKhachHang " + now + ".xlsx");
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
                <InputLabel id="province-select-label">T???nh/Th??nh</InputLabel>
                <Select
                  labelId="province-select-label"
                  id="province-simple-select"
                  defaultValue={province}
                  label="T???nh/Th??nh"
                  onChange={handleChangeProvince}
                >
                  <MenuItem value={0}>T???t c???</MenuItem>
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
                <InputLabel id="district-select-label">Qu???n/Huy???n</InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-simple-select"
                  defaultValue={district}
                  label="Qu???n/Huy???n"
                  onChange={handleChangeDistrict}
                >
                  <MenuItem value={0}>T???t c???</MenuItem>
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
                <InputLabel id="ward-select-label">X??/Ph?????ng</InputLabel>
                <Select
                  labelId="ward-select-label"
                  id="ward-simple-select"
                  defaultValue={ward}
                  label="X??/Ph?????ng"
                  onChange={handleChangeWard}
                >
                  <MenuItem value={0}>T???t c???</MenuItem>
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
              label="T??? ng??y"
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={2}>
            <DesktopDatePicker
              label="?????n ng??y"
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
  const [count, setCount] = useState(0)
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
      enqueueSnackbar("Kh??ng ???????c ch???n ng??y l???n h??n ng??y hi???n t???i", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (Date.parse(startDate) > Date.parse(endDate)) {
      enqueueSnackbar("Ng??y b???t ?????u kh??ng ???????c l???n h??n ng??y k???t th??c", {
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
    setCount(count+1)
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
          removeAccents(data.user_email).includes(removeAccents(string)) ||
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
    documentTitle: "ThongKeKhachHang" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  const [rowSelected, setRowSelected] = useState()

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
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid item xs={12} sx={{ float: "right", mr: 0.5 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickSearch}
                        sx={{ backgroundColor: "#ffffff" }}
                      >
                        T??m ki???m
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={9}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddForm}
                  sx={{ ml: 0.5 }}
                >
                  <AddIcon sx={{ mr: 0.5 }} />
                  Th??m ng?????i d??ng
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={exportFile}
                  sx={{ ml: 0.5 }}
                >
                  <SaveAltIcon sx={{ mr: 0.5 }} /> Xu???t Excel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrint()}
                  sx={{ ml: 0.5 }}
                >
                  <PrintIcon sx={{ mr: 0.5 }} /> T???o b???n in
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
                  H??nh ?????ng
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
                  <MenuItem onClick={handleClickChange} disableRipple>
                    <EditIcon />
                    C???p nh???t tr???ng th??i
                  </MenuItem>

                  <MenuItem onClick={handleClickDelete} disableRipple>
                    <CancelIcon />
                    Xo??
                  </MenuItem>
                </StyledMenu>
              </Grid>
              <Grid item xs={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search???"
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
              columns={isCcn ? columns2 : columns}
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
            {Copyright()}
          </Grid>
          {renderForm()}
          <Grid container sx={{ display: "none" }}>
            <div ref={componentRef}>
              <Grid container>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontWeight: 600 }}>{INFO.name}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 600 }}>M???u in: B114</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ng??y in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    K???t qu??? th???ng k?? t??i kho???n kh??ch h??ng
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    {count === 0
                      ? `(T??? ng??y: ${format(
                          startD,
                          "dd-MM-yyyy"
                        )} --- ?????n ng??y: 
                    ${format(endD, "dd-MM-yyyy")})`
                      : `(T??? ng??y: ${format(
                          startDate,
                          "dd-MM-yyyy"
                        )} --- ?????n ng??y: 
                    ${format(endDate, "dd-MM-yyyy")})`}
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell align="center">UserName</TableCell>
                      <TableCell align="center">H???</TableCell>
                      <TableCell align="center">T??n</TableCell>
                      <TableCell align="center" sx={{ width: "121px" }}>
                        S??? ??i???n tho???i
                      </TableCell>
                      <TableCell align="center" sx={{ width: "300px" }}>
                        ?????a ch???
                      </TableCell>
                      <TableCell align="center">Tr???ng th??i</TableCell>
                      <TableCell align="center">Lo???i ng?????i d??ng</TableCell>
                      <TableCell align="center">Ng??y t???o</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row, key) => {
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
                            {row.user_tel.replace(
                              /(\d{3})(\d{3})(\d{4})/,
                              "$1-$2-$3"
                            )}
                          </TableCell>
                          <TableCell align="left">{row.user_address}</TableCell>
                          <TableCell align="left">
                            {row.user_status === "active"
                              ? "Ho???t ?????ng"
                              : "B??? kho??"}
                          </TableCell>
                          <TableCell align="left">
                            {row.user_typeid === "KH"
                              ? "Kh??ch h??ng"
                              : "Nh??n vi??n"}
                          </TableCell>
                          <TableCell align="center">
                            {formatDate(row.user_date)}
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
