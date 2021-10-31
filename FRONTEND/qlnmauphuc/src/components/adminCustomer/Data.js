import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { getClothData, getProductData } from "../../redux/Action";
import { LOCAL_PATH, XOA_HINH_ANH } from "../../constants/Constants";
import { createTheme, styled } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  MyFormControl,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ChangeForm from "./changeForm/changeForm";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PermissionForm from "./permissionForm/PermissionForm";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { CustomNoRowsOverlay, useStylesAntDesign } from "../utility/DataGridTheme";

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
  const [permissionForm, setPermissionForm] = useState(false);
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

  const openPermissionForm = () => {
    setPermissionForm(true);
  };
  const closePermissionForm = () => {
    setPermissionForm(false);
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
        ></AddForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={parseInt(userId)}
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
        ></ChangeForm>
      );
    }
    if (permissionForm) {
      return (
        <PermissionForm
          open={permissionForm}
          onClose={closePermissionForm}
          id={parseInt(userId)}
          listId={userIdList}
        ></PermissionForm>
      );
    }
  };

  const columns = [
    { field: "user_avatar", headerName: "Avatar", width: 100, 
  renderCell: (params) => {
    return <Avatar src={LOCAL_PATH + params.value.substring(2)} />;
  } },
    { field: "user_username", headerName: "UserName", width: 100 },
    { field: "user_lastname", headerName: "Họ", width: 200 },
    { field: "user_firstname", headerName: "Tên", width: 130 },
    { field: "user_tel", headerName: "Số điện thoại", width: 140,
  renderCell: (params) => {
    const formatTel = (text) => {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      };
      return formatTel(params.value)
  } },
    { field: "user_address", headerName: "Địa chỉ", width: 300 },
    {
      field: "user_status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        if (params.value === "active") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Hoạt động
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              Bi khoá
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_typeid",
      headerName: "Loại người dùng",
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
            Nhân viên
          </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              Khách hàng
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_date",
      headerName: "Ngày tạo",
      width: 180,
      renderCell: (params) => {
        return formatDate(params.value);
      },
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
      headerName: "Số điện thoại",
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
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        if (params.value === "active") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              Hoạt động
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              Bi khoá
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_typeid",
      headerName: "Loại người dùng",
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
              Nhân viên
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              Khách hàng
            </MyButton>
          );
        }
      },
    },
    {
      field: "user_date",
      headerName: "Ngày tạo",
      width: 180,
      renderCell: (params) => {
        return formatDate(params.value);
      },
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
    var list = JSON.parse(JSON.stringify(dataRender));
    list.map((item) => {
      delete item.user_password;
      delete item.user_city;
      delete item.user_wardid;
      delete item.ward_prefix;
      delete item.ward_name;
      delete item.ward_districtid;
      delete item.district_prefix;
      delete item.district_name;
      delete item.ward_provinceid;
      delete item.province_name;
      return item;
    });
    const ws = XLSX.utils.json_to_sheet(
      list
    );
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
          removeAccents(data.user_lastname + " " + data.user_firstname).includes(removeAccents(string)) ||
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
                      >
                        Tìm kiếm
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={6}>
                
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={openAddForm}
                    sx={{ ml: 0.5 }}
                  >
                    Thêm người dùng
                  </Button>
                
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
                  <MenuItem onClick={handleClickChange} disableRipple>
                    <EditIcon />
                    Cập nhật trạng thái
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
              height: 405,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={rows}
              columns={isCcn ? columns2 : columns}
              pageSize={5}
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
                setUserIdList(selectedRowData);
              }}
            />
          </Grid>
          {renderForm()}
        </>
      )}
    </Grid>
  );
}
