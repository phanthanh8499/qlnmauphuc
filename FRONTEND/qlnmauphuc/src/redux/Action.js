import Axios from "axios";
import {
  CHINH_SUA_THONG_TIN_SAN_PHAM,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  LIET_KE_SAN_PHAM,
  LIET_KE_THAT_BAI,
  LIET_KE_USERS_CHUA_CAP_NHAT,
  LIET_KE_USERS_DA_CAP_NHAT,
  LIET_KE_USERS_THANH_CONG,
  LIET_KE_USERS_THAT_BAI,
  THEM_SAN_PHAM,
  XOA_SAN_PHAM,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_LIET_KE_USERS,
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