import React, { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { makeStyles } from "@mui/styles";
import { INFO, LOCAL_PATH } from "../../constants/Constants";
import { styled } from "@mui/material/styles";
import {
  Copyright,
  MyFormControl,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import {
  CustomNoRowsOverlay,
  useStylesAntDesign,
} from "../utility/DataGridTheme";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useDispatch } from "react-redux";
import { getActivityLogData } from "../../redux/Action";
import { ProductLog } from "./productLog";
import { ClothLog } from "./clothLog";
import { UserLog } from "./userLog";
import { purple, lightGreen, blue, red } from "@mui/material/colors";

const MyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
  img: {
    height: 100,
    width: 100,
  },
}));

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { enqueueSnackbar } = useSnackbar();
  const { data, startD, endD } = props;
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setDataRender(data);
    setDataBackup(data);
    setLoading(false);
  }, [data]);

  const rows = dataRender;

  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [productIdList, setProductIdList] = useState([]);
  const [productId, setProductId] = useState(0);
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
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
    if (productIdList.length === 0) {
      enqueueSnackbar("Vui l??ng ch???n s???n ph???m c???n xo??", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    openDeleteForm();
  };

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/??/g, "d")
      .replace(/??/g, "D");
  };

  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const [productLog, setProductLog] = useState(false);
  const closeProductLog = () => {
    setProductLog(false);
  };

  const [clothLog, setClothLog] = useState(false);
  const closeClothLog = () => {
    setClothLog(false);
  };

  const [userLog, setUserLog] = useState(false);
  const closeUserLog = () => {
    setUserLog(false);
  };

  const renderForm = () => {
    if (addForm) {
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          dataReq={rowSelected}
          userid={userInfo.id}
        ></AddForm>
      );
    }
    if (productLog) {
      return (
        <ProductLog
          open={productLog}
          onClose={closeProductLog}
          dataReq={rowSelected}
        ></ProductLog>
      );
    }
    if (clothLog) {
      return (
        <ClothLog
          open={clothLog}
          onClose={closeClothLog}
          dataReq={rowSelected}
        ></ClothLog>
      );
    }
    if (userLog) {
      return (
        <UserLog
          open={userLog}
          onClose={closeUserLog}
          dataReq={rowSelected}
        ></UserLog>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={parseInt(productId)}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={parseInt(productId)}
          listId={productIdList}
          userid={userInfo.id}
        ></DeleteForm>
      );
    }
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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      resizable: true,
      width: 105,
      align: "center",
    },
    // { field: "id", headerName: "id", width: 120 },
    {
      field: "user_username",
      headerName: "Nh??n vi??n",
      width: 160,
      renderCell: (params) => {
        if (params.value === "admin") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    {
      field: "ft_name",
      headerName: "Ch???c n??ng",
      width: 240,
      renderCell: (params) => {
        if (params.value === "Qu???n l?? s???n ph???m") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Qu???n l?? v???i") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Qu???n l?? ????n h??ng") {
          return (
            <MyButton
              variant="outlined"
              color="error"
              sx={{ color: blue[500]}}
              fullWidth
            >
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Qu???n l?? t??i kho???n ng?????i d??ng") {
          return (
            <MyButton
              variant="outlined"
              color="warning"
              sx={{ color: lightGreen[ blue,900] }}
              fullWidth
            >
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Qu???n l?? t??i kho???n nh??n vi??n") {
          return (
            <MyButton
              variant="outlined"
              color="warning"
              sx={{ color: red[900] }}
              fullWidth
            >
              {params.value}
            </MyButton>
          );
        }
      },
    },
    {
      field: "et_name",
      headerName: "Thao t??c",
      width: 170,
      renderCell: (params) => {
        if (params.value === "Th??m m???i") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Ch???nh s???a") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Xo??") {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Hu???") {
          return (
            <MyButton
              variant="outlined"
              color="primary"
              sx={{ color: purple[500] }}
              fullWidth
            >
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "M??? kho?? t??i kho???n") {
          return (
            <MyButton variant="outlined" color="warning" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Kho?? t??i kho???n") {
          return (
            <MyButton variant="outlined" color="secondary" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Duy???t") {
          return (
            <MyButton variant="outlined" color="primary" sx={{color: red[500]}} fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    {
      field: "log_description",
      headerName: "N???i dung",
      width: 650,
    },
    {
      field: "log_date",
      headerName: "Th???i gian",
      width: 200,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "log_eventtypeid",
      headerName: "H??nh ?????ng",
      width: 140,
      renderCell: (params) => {
        if (params.value === "EPF") {
          return (
            <IconButton onClick={(e) => setProductLog(true)} size="large">
              <VisibilityIcon color="primary" />
            </IconButton>
          );
        } else if (params.value === "ECF") {
          return (
            <IconButton onClick={(e) => setClothLog(true)} size="large">
              <VisibilityIcon color="primary" />
            </IconButton>
          );
        } else if (params.value === "ESA" || params.value === "ECA") {
          return (
            <IconButton onClick={(e) => setUserLog(true)} size="large">
              <VisibilityIcon color="primary" />
            </IconButton>
          );
        } else {
          return <></>;
        }
      },
    },
  ];

  const exportFile = () => {
    var now = new Date();
    var list = [];
    for (let i = 0; i < dataRender.length; i++) {
      list.push({
        STT: dataRender[i].stt,
        "Nh??n vi??n": dataRender[i].user_username,
        "Ch???c n??ng": dataRender[i].ft_name,
        "Thao t??c": dataRender[i].et_name,
        "N???i dung": dataRender[i].log_description,
        "Th???i gian": formatDate(dataRender[i].log_date),
      });
    }
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "NhatKyHoatDong " + now + ".xlsx");
  };

  const theme = useTheme();
  const handleChangeFunction = async (event) => {
    var string = event.target.value;
    setFunctionSelected(string);
    console.log(string);
    const { data } = await axios.get(`/getEventTypeData.${string}`);
    setEventType(data);
    if (string === "All") {
      setEventSelected("All");
    }
  };

  const [dataBackup, setDataBackup] = useState([]);
  const [count, setCount] = useState(0);
  const handleClickSearch = () => {
    // let temp = [...data];
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
    }
    const dataSend = {
      functiontypeid: functionSelected,
      eventtypeid: eventSelected,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getActivityLogData(dataSend));
    // setDataRender(temp);
    // setDataBackup(temp);
    setCount(count + 1);
  };

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          data.stt === parseInt(string) ||
          data.user_username.toLowerCase().includes(string.toLowerCase()) ||
          removeAccents(data.log_description)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.ft_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.et_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          formatDate(data.log_date)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase())
          // data.product_old_price.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const [thicknessSelected, setThicknessSelected] = useState("");
  const [softnessSelected, setSoftnessSelected] = useState("");
  const [elasticitySelected, setElasticitySelected] = useState("");
  const [functionType, setFunctionType] = useState([]);
  const [functionSelected, setFunctionSelected] = useState("All");
  const [eventType, setEventType] = useState([]);
  const [eventSelected, setEventSelected] = useState("All");
  useEffect(() => {
    async function getFunctionType() {
      const { data } = await axios.get(`/getFunctionTypeData`);
      setFunctionType(data);
    }
    async function getEventType() {
      const { data } = await axios.get(`/getEventTypeData.All`);
      setEventType(data);
    }
    getFunctionType();
    getEventType();
  }, []);

  const eventTypes = [
    { id: "Add", et_name: "Th??m m???i" },
    { id: "Edit", et_name: "Ch???nh s???a" },
    { id: "Remove", et_name: "Xo??" },
    { id: "Cancel", et_name: "Hu??? b???" },
  ];

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

  const renderSearchForm = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MyFormControl sx={{ ml: 0.5, width: "100%" }}>
            <InputLabel id="select-function-color-label">Ch???c n??ng</InputLabel>
            <Select
              labelId="function-select-label"
              id="function-select"
              value={functionSelected}
              displayEmpty
              label="????? d??y"
              onChange={handleChangeFunction}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="All">
                <em>T???t c???</em>
              </MenuItem>
              {functionType.map((name, key) => (
                <MenuItem key={key} value={name.id}>
                  {name.ft_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={2}>
          <MyFormControl fullWidth>
            <InputLabel id="event-select-label">Thao t??c</InputLabel>
            <Select
              labelId="event-select-label"
              id="event-select"
              value={eventSelected}
              displayEmpty
              label="????? d??y"
              onChange={(e) => setEventSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="All">
                <em>T???t c???</em>
              </MenuItem>
              {eventType.map((name, key) => (
                <MenuItem
                  key={key}
                  value={name.id}
                  style={getStyles(name, functionSelected, theme)}
                >
                  {name.et_name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={2}>
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
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSearch}
            sx={{ float: "right", mr: 0.5 }}
          >
            T??m ki???m
          </Button>
        </Grid>
      </Grid>
    );
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
    documentTitle: "BaoCaoSanPham" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  const [rowSelected, setRowSelected] = useState();

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
          <Grid item xs={12} sx={{ mb: 0.5 }}>
            <Grid container>
              <Grid item xs={12}>
                {renderSearchForm()}
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={9}>
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
              height: 495,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              className={antDesignClasses.root}
              checkboxSelection
              disableSelectionOnClick
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              onRowClick={(param) =>
                setRowSelected({
                  id: param.row.id,
                  eventtypeid: param.row.log_eventtypeid,
                  description: param.row.log_description,
                })
              }
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = dataRender.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setProductIdList(selectedRowData);
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
                  <Typography sx={{ fontWeight: 600 }}>M???u in: B121</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ng??y in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">Nh???t k?? ho???t ?????ng</Typography>
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
                      <TableCell>STT</TableCell>
                      <TableCell align="center">Nh??n vi??n</TableCell>
                      <TableCell align="center">Ch???c n??ng</TableCell>
                      <TableCell align="center">Thao t??c</TableCell>
                      <TableCell align="center">N???i dung</TableCell>
                      <TableCell align="center">Th???i gian</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.stt}
                          </TableCell>
                          <TableCell align="center">
                            {row.user_username}
                          </TableCell>
                          <TableCell align="center">{row.ft_name}</TableCell>
                          <TableCell align="center">{row.et_name}</TableCell>
                          <TableCell align="left">
                            {row.log_description}
                          </TableCell>
                          <TableCell align="left">
                            {formatDate(row.log_date)}
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
