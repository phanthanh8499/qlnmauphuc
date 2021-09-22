import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import { Button, ButtonGroup, Grid, IconButton, Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getClothData, getProductData } from "../../redux/Action";
import { XOA_HINH_ANH } from "../../constants/Constants";


const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: '0px 0px 5px 0px !important',
  },
}));

export default function AdminCloth() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const cloth = useSelector((state) => state.cloth);
  const { loading, clothData, error } = cloth;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClothData());
    
  }, [dispatch])
  const rows = clothData;
  const [clothId, setClothId] = useState("");
  
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const openAddForm = () => {
    setAddForm(true);
  };
  const closeAddForm = () => {
    setAddForm(false);
    dispatch({type: XOA_HINH_ANH})
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

  const renderForm = () => {
    if(addForm){
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(clothData[Object.keys(clothData).sort().pop()].id)}
        ></AddForm>
      );
    }
    if(detailForm){
      return <DetailForm open={detailForm} onClose={closeDetailForm} id={parseInt(clothId)}></DetailForm>
    }
    if(deleteForm){
      return <DeleteForm open={deleteForm} onClose={closeDeleteForm} id={parseInt(clothId)}></DeleteForm>
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "cloth_material", headerName: "Thành phần", width: 300 },
    { field: "cloth_name", headerName: "Tên vải", width: 250 },
    { field: "cloth_quantity", headerName: "Số lượng (mét)", width: 200, type: "number" },
    {
      field: "cloth_userid",
      headerName: "Chủ sở hữu",
      width: 150,
      type: "number",
    },
    { field: "cloth_typeid", headerName: "Loại vải", width: 200 },
    {
      field: "Hành động",
      headerName: "Hành động",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
        };

        const handleClickDelete = () => {
          openDeleteForm();
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

  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <Grid container >
          <Grid item xs={12} className={classes.topBar} component={Paper}>
            <Button variant="outlined" color="primary" onClick={openAddForm}>
              Thêm sản phẩm
            </Button>
          </Grid>
          <Grid item xs={12} style={{ height: 515, width: "100%", 'background-color': '#ffffff' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              onSelectionModelChange={(row) => setClothId(row.toString())}
            />
          </Grid>
          {renderForm()}
        </Grid>
      )}
    </>
  );
}
