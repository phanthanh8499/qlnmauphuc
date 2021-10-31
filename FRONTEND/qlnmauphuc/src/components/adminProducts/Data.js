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
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Tab,
} from "@mui/material";
import { getProductData } from "../../redux/Action";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import { LOCAL_PATH } from "../../constants/Constants";
import { styled } from "@mui/material/styles";
import { MyFormControl, Search, SearchIconWrapper, StyledInputBase, StyledMenu } from "../utility/Utility";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { CustomNoRowsOverlay, useStylesAntDesign } from "../utility/DataGridTheme";

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

const MyBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "-10px",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

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

const MyDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-row": {
    minHeight: "100px !important",
    maxHeight: "100px !important",
  },
  "& .MuiDataGrid-cell": {
    minHeight: "100px !important",
    maxHeight: "100px !important",
  },
  "& .MuiDataGrid-viewport": {
    height: "500px !important",
  },
}));

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { enqueueSnackbar } = useSnackbar();
  const {data} = props;
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setDataRender(data)
    setDataBackup(data)
    setLoading(false)
  }, [data]);

  const rows = dataRender;
  const [productid, setProductid] = useState("");

  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [productIdList, setProductIdList] = useState([]);
  const [productId, setProductId] = useState(0)
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
    if(productIdList.length === 0){
      enqueueSnackbar("Vui lòng chọn sản phẩm cần xoá", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    openDeleteForm();
  };

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        ></DeleteForm>
      );
    }
  };

  const columns = [
    // { field: "id", headerName: "ID", resizable: true },
    { field: "product_code", headerName: "Mã SP", width: 120 },
    {
      field: "product_image1",
      headerName: "Hình ảnh",
      width: 120,
      renderCell: (params) => {
        return (
          <img
            src={LOCAL_PATH + params.value.substring(2)}
            alt="HinhAnhSP"
            className={classes.img}
          ></img>
        );
      },
    },
    { field: "product_name", headerName: "Tên sản phẩm", width: 400 },
    { field: "product_price", headerName: "Giá", width: 100, type: "number" },
    {
      field: "product_old_price",
      headerName: "Giá cũ",
      width: 130,
      type: "number",
    },
    { field: "product_color", headerName: "Màu sắc", width: 250 },
    { field: "product_material", headerName: "Chất liệu", width: 300 },
    { field: "product_lining", headerName: "Lớp lót", width: 130 },
    { field: "product_thickness", headerName: "Độ dày", width: 130 },
    { field: "product_softness", headerName: "Độ mềm", width: 130 },
    { field: "product_elasticity", headerName: "Độ co giãn", width: 130 },
    {
      field: "id",
      headerName: "Hành động",
      sortable: false,
      width: 110,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setProductId(params.value);
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setProductId(params.value);
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
      delete item.product_image2;
      delete item.product_image3;
      delete item.product_introduction1;
      delete item.product_introduction2;
      delete item.product_introduction3;
      delete item.product_introduction4;
      delete item.product_introduction5;
      return item;
    });
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const ws = XLSX.utils.json_to_sheet(
      list
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSSanPham " + now + ".xlsx");
  };


  const theme = useTheme();
  const [colorSelected, setColorSelected] = React.useState([]);

  const names = [
    "Trắng",
    "Đen",
    "Xám",
    "Xanh",
    "Xanh thanh",
    "Vàng",
    "Vàng nâu",
    "Đỏ",
    "Đỏ rượu",
    "Đỏ nâu",
  ];

  const handleChangeColor = (event) => {
    const {
      target: { value },
    } = event;
    setColorSelected(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [dataBackup, setDataBackup] = useState([])
  const handleClickSearch = () => {
    let temp = [...data];
    if (colorSelected.length >= 1){
      for(let i = 0; i<colorSelected.length; i++){
        temp = temp.filter((data) => {
          return removeAccents(data.product_color)
            .toLowerCase()
            .includes(removeAccents(colorSelected[i]).toLowerCase());
        } 
        );
      }
    }
    if(thicknessSelected){
      temp = temp.filter(
        (data) => data.product_thickness === thicknessSelected
      );
    }
    if(softnessSelected){
      temp = temp.filter(
        (data) => data.product_softness === softnessSelected
      );
    }
    if(elasticitySelected){
      temp = temp.filter(
        (data) => data.product_elasticity === elasticitySelected
      );
    }
    setDataRender(temp); 
    setDataBackup(temp); 
  }

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          data.id === parseInt(string) ||
          data.product_code.toLowerCase().includes(string.toLowerCase()) ||
          removeAccents(data.product_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_material)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_lining)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_thickness)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_softness)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_color)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_elasticity)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          data.product_price.toString().includes(string)
          // data.product_old_price.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const [thicknessSelected, setThicknessSelected] = useState('');
  const [softnessSelected, setSoftnessSelected] = useState("");
  const [elasticitySelected, setElasticitySelected] = useState("");
  const renderSearchForm = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MyFormControl sx={{ ml: 0.5, width: "100%" }}>
            <InputLabel id="select-color-label">Màu sắc</InputLabel>
            <Select
              multiple
              displayEmpty
              value={colorSelected}
              onChange={handleChangeColor}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Tất cả</em>;
                }
                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Tất cả</em>
              </MenuItem>
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, colorSelected, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="thickess-select-label">Độ dày</InputLabel>
            <Select
              labelId="thickess-select-label"
              id="thickess-select"
              value={thicknessSelected}
              displayEmpty
              label="Độ dày"
              onChange={(e) => setThicknessSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Mỏng">Mỏng</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Dày">Dày</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="softness-select-label">Độ dày</InputLabel>
            <Select
              labelId="softness-select-label"
              id="softness-select"
              value={softnessSelected}
              displayEmpty
              label="Độ dày"
              onChange={(e) => setSoftnessSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Mềm">Mềm</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Cứng">Cứng</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="elasticity-select-label">Độ co giãn</InputLabel>
            <Select
              labelId="elasticity-select-label"
              id="elasticity-select"
              value={elasticitySelected}
              displayEmpty
              label="Độ co giãn"
              onChange={(e) => setElasticitySelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Không">Không</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Có">Có</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSearch}
            sx={{ float: "right", mr:0.5 }}
          >
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
    );
  }
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
          <Grid item xs={12} sx={{mb:0.5}}>
            <Grid container>
              <Grid item xs={12}>
                {renderSearchForm()}
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={9}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddForm}
                  sx={{ ml: 0.5 }}
                >
                  Thêm sản phẩm
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
                  <MenuItem onClick={handleClickEdit} disableRipple>
                    <EditIcon />
                    Cập nhật trạng thái
                  </MenuItem>
                  <MenuItem onClick={handleClickDelete} disableRipple>
                    <CancelIcon />
                    Xoá
                  </MenuItem>
                </StyledMenu>
              </Grid>
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
              height: 425,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <MyDataGrid
              rows={rows}
              columns={columns}
              pageSize={3}
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
                setProductIdList(selectedRowData);
              }}
            />
          </Grid>
          {renderForm()}
        </>
      )}
    </Grid>
  );
}
