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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

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
      field: "id",
      headerName: "ID",
      width: 200,
    },
    { field: "gv_discription", headerName: "M?? t???", width: 300 },
    {
      field: "gv_discount",
      headerName: "Gi???m gi?? (%)",
      width: 160,
      align: "center",
    },
    {
      field: "gv_creationdate",
      headerName: "Ng??y t???o",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "gv_expirationdate",
      headerName: "Ng??y h???t h???n",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "user_username",
      headerName: "Ch??? s??? h???u",
      width: 180,
    },
    {
      field: "gv_isactivated",
      headerName: "Tr???ng th??i",
      width: 180,
      align: "center",
      renderCell: (params) => {
        if (params.value === true) {
          return <CheckBoxIcon color="success"/>;
        } else {
          return <CheckBoxOutlineBlankIcon color="error"/>;
        }
      },
    },
  ];

  const exportFile = () => {
    var list = [];
    for(let i=0; i<dataRender.length; i++){
      list.push({
        STT: i + 1,
        ID: dataRender[i].id,
        "M?? t???": dataRender[i].gv_discription,
        "Gi???m gi?? (%)": dataRender[i].gv_discount,
        "Ng??y t???o": formatDate(dataRender[i].gv_creationdate),
        "Ng??y h???t h???n": formatDate(dataRender[i].gv_expirationdate),
        "Ch??? s??? h???u": dataRender[i].user_username,
        "Tr???ng th??i":
          dataRender[i].gv_isactivated === true
            ? "???? k??ch ho???t"
            : "Ch??a k??ch ho???t",
      });
    }
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSMaGiamGia " + now + ".xlsx");
  };

  const [dataBackup, setDataBackup] = useState();

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          removeAccents(data.id).includes(removeAccents(string)) ||
          removeAccents(data.gv_discription).includes(removeAccents(string)) ||
          removeAccents(data.user_username).includes(removeAccents(string)) ||
          formatDate(data.gv_creationdate).toString().includes(string) ||
          formatDate(data.gv_expirationdate).toString().includes(string) 
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
    documentTitle: "ThongKeMaGiamGia" + "_Ngay_" + format(now, "dd-MM/yyyy"),
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
              <Grid item xs={9}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddForm}
                  sx={{ ml: 0.5 }}
                >
                  <AddIcon sx={{ mr: 0.5 }} />
                  Th??m Voucher
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
                  <Typography sx={{ fontWeight: 600 }}>M???u in: B119</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ng??y in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    K???t qu??? th???ng k?? m?? gi???m gi??
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    {`(T??? ng??y: ${format(
                          startD,
                          "dd-MM-yyyy"
                        )} --- ?????n ng??y: 
                    ${format(endD, "dd-MM-yyyy")})`
                      }
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">M?? t???</TableCell>
                      <TableCell align="center">Gi???m gi?? (%)</TableCell>
                      <TableCell align="center" >
                        Ng??y t???o
                      </TableCell>
                      <TableCell align="center">Ng??y h???t h???n</TableCell>
                      <TableCell align="center">Ch??? s??? h???u</TableCell>
                      <TableCell align="center">Tr???ng th??i</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row, key) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {key+1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>

                          <TableCell align="left">
                            {row.gv_discription}
                          </TableCell>
                          <TableCell align="left">{row.gv_discount}</TableCell>
                          <TableCell align="center">
                            {formatDate(row.gv_creationdate)}
                          </TableCell>
                          <TableCell align="center">
                            {formatDate(row.gv_expirationdate)}
                          </TableCell>
                          <TableCell align="left">
                            {row.user_username}
                          </TableCell>
                          <TableCell align="left">
                            {row.gv_isactivated === true
                              ? "???? k??ch ho???t"
                              : "Ch??a k??ch ho???t"}
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
