import Axios from "axios";
import { useSnackbar } from "notistack";
import {
  CHINH_SUA_THONG_TIN_DON_HANG,
  CHINH_SUA_THONG_TIN_SAN_PHAM,
  CHINH_SUA_THONG_TIN_SO_DO,
  CHINH_SUA_THONG_TIN_VAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  LIET_KE_BFM,
  LIET_KE_DON_HANG,
  LIET_KE_DON_HANG_THAT_BAI,
  LIET_KE_SAN_PHAM,
  LIET_KE_SFM,
  LIET_KE_SO_DO,
  LIET_KE_SO_DO_THAT_BAI,
  LIET_KE_TFM,
  LIET_KE_THAT_BAI,
  LIET_KE_USERS_CHUA_CAP_NHAT,
  LIET_KE_USERS_DA_CAP_NHAT,
  LIET_KE_USERS_THANH_CONG,
  LIET_KE_USERS_THAT_BAI,
  LIET_KE_VAI,
  LIET_KE_VAI_CUA_TOI,
  LIET_KE_VAI_THAT_BAI,
  SUA_THONG_TIN_USER,
  THEM_DON_HANG,
  THEM_SAN_PHAM,
  THEM_SO_DO,
  THEM_VAI,
  XEM_DON_HANG,
  XEM_SO_DO,
  XOA_DON_HANG,
  XOA_SAN_PHAM,
  XOA_SO_DO,
  XOA_VAI,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_DON_HANG,
  YEU_CAU_LIET_KE_SO_DO,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_LIET_KE_USERS,
  YEU_CAU_LIET_KE_VAI,
} from "../constants/Constants";

export const dangNhapKhangHang = (username, password) => async (dispatch) => {
  dispatch({ type: YEU_CAU_DANG_NHAP });
  try {
    const { data } = await Axios.post("/signin", { username, password });
    dispatch({ type: DANG_NHAP_THANH_CONG, payload: data });
    localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
  } catch (error) {
    dispatch({ type: DANG_NHAP_THAT_BAI, payload: error.message });
  }
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_USERS });
  try {
    const { data } = await Axios.get("/admin/users");
    dispatch({ type: LIET_KE_USERS_THANH_CONG, payload: data });
    dispatch({ type: LIET_KE_USERS_DA_CAP_NHAT });
    dispatch({ type: LIET_KE_USERS_CHUA_CAP_NHAT });
  } catch (error) {
    dispatch({ type: LIET_KE_USERS_THAT_BAI, payload: error.message });
  }
};

export const getProductData = () => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_SP});
  try {
    const { data } = await Axios.get("/getProductData");
    dispatch({ type: LIET_KE_SAN_PHAM, payload: data});
    // dispatch({ type: LIET_KE_BFM });
    // dispatch({ type: LIET_KE_TFM });
    // dispatch({ type: LIET_KE_SFM });
  } catch (error) {
    dispatch({ type: LIET_KE_THAT_BAI, payload: error.message});
  }
}

export const addProduct = (data) => async (dispatch) => {
  const abc = {};
  data.forEach((value, key) => (abc[key] = value));
  dispatch({ type: THEM_SAN_PHAM, payload: abc });
  await Axios.post("/admin/products/add", data);
}

export const editProduct = (data) =>  (dispatch) => {
  const abc = {};
  data.forEach((value, key) => (abc[key] = value));
  Axios.post("/admin/products/edit", data);
  dispatch({ type: CHINH_SUA_THONG_TIN_SAN_PHAM, payload: abc});
}

export const deleteProduct = (data) => async (dispatch) => {
  dispatch({ type: XOA_SAN_PHAM, payload: data});
  await Axios.get(`/admin/products/delete.${data}`);
}

export const getClothData = (dataReq) => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_VAI});
  try {
    const {data} = await Axios.post("/getClothData", dataReq);
    dispatch({type: LIET_KE_VAI, payload: data})
  } catch (error) {
    dispatch({type: LIET_KE_VAI_THAT_BAI, payload: error.message})
  }
}

export const getMyClothData = (dataReq) => async (dispatch) => {
  const {data} = await Axios.post("/getMyClothData", dataReq);
  dispatch({type: LIET_KE_VAI_CUA_TOI, payload: data})
}

export const addCloth = (data) => async (dispatch) => {
  let abc = {};
  data.forEach((value, key) => (abc[key] = value));
  abc.id = parseInt(abc.id)
  dispatch({ type: THEM_VAI, payload: abc });
  await Axios.post("/admin/cloth/add", data);
};

export const editCloth = (data) => (dispatch) => {
  const abc = {};
  data.forEach((value, key) => (abc[key] = value));
  Axios.post("/admin/cloth/edit", data);
  dispatch({ type: CHINH_SUA_THONG_TIN_VAI, payload: abc });
};

export const deleteCloth = (data) => async (dispatch) => {
  dispatch({ type: XOA_VAI, payload: data });
  await Axios.get(`/admin/cloth/delete.${data}`);
};

export const getMeasurementsData = (id) => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_SO_DO});
  try {
    const { data } = await Axios.get(`/getMeasurementsData.${id}`);
    dispatch({type: LIET_KE_SO_DO, payload: data})
  } catch (error) {
    dispatch({type: LIET_KE_SO_DO_THAT_BAI, payload: error.message})
  }
}

export const addMeasurements = (dataReq) => async (dispatch) => {
  const abc = {};
  dataReq.forEach((value, key) => (abc[key] = value));
  dispatch({ type: THEM_SO_DO, payload: abc });
  const {data} = await Axios.post("/admin/measurements/add", dataReq);
};

export const editMeasurements = (dataReq) => async (dispatch) => {
  const abc = {};
  dataReq.forEach((value, key) => (abc[key] = value));
  const {data} = await Axios.post("/admin/measurements/edit", dataReq);
  dispatch({ type: CHINH_SUA_THONG_TIN_SO_DO, payload: abc, msg: data });
};

export const deleteMeasurements = (data) => async (dispatch) => {
  dispatch({ type: XOA_SO_DO, payload: data });
  // await Axios.get(`/admin/measurements/delete.${data}`);
};

export const getDetailMeasurements = (dataReq) => async (dispatch) => {
  const {data} = await Axios.get(`/getDetailMeasurements.${dataReq}`);
  dispatch({ type: XEM_SO_DO, payload: data });
};

export const editUserInfo = (dataReq) => async (dispatch) => {
  const abc = {};
  dataReq.forEach((value, key) => (abc[key] = value));
  const { data } = await Axios.post(`/admin/users/edit`, dataReq);
  dispatch({ type: SUA_THONG_TIN_USER, payload: abc });
  localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
  console.log(data);
};

export const getOrderData = (id) => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_DON_HANG });
  try {
    const { data } = await Axios.get(`/getOrderData.${id}`);
    dispatch({ type: LIET_KE_DON_HANG, payload: data });
  } catch (error) {
    dispatch({ type: LIET_KE_DON_HANG_THAT_BAI, payload: error.message });
  }
};

export const addOrder = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post("/admin/order/add", dataReq);
  console.log(data)
  dispatch({ type: THEM_DON_HANG, payload: dataReq });
};

export const editOrder = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post("/admin/order/edit", dataReq);
  dispatch({ type: CHINH_SUA_THONG_TIN_DON_HANG, payload: data, msg: data });
};

export const deleteOrder = (data) => async (dispatch) => {
  console.log("delete", data)
  dispatch({ type: XOA_DON_HANG, payload: data });
  // await Axios.get(`/admin/Order/delete.${data}`);
};

export const getDetailOrder = (dataReq) => async (dispatch) => {
  const { data } = await Axios.get(`/getDetailOrder.${dataReq}`);
  dispatch({ type: XEM_DON_HANG, payload: data });
};