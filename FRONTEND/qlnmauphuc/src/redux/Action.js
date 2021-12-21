import Axios from "axios";
import { useSnackbar } from "notistack";
import {
  CHINH_SUA_THONG_TIN_DON_HANG,
  CHINH_SUA_THONG_TIN_SAN_PHAM,
  CHINH_SUA_THONG_TIN_SO_DO,
  CHINH_SUA_THONG_TIN_VAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  HUY_DON_HANG,
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
  XU_LY_DON_HANG,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_DON_HANG,
  YEU_CAU_LIET_KE_SO_DO,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_LIET_KE_USERS,
  YEU_CAU_LIET_KE_VAI,
  XOA_USER,
  THEM_USER,
  SUA_USER,
  THAY_DOI_TRANG_THAI_USER,
  BAO_CAO_HOA_DON,
  BAO_CAO_TRANG_THAI_HOA_DON,
  BAO_CAO_TIEN_DO_HOA_DON,
  BAO_CAO_THUONG_MAI,
  BAO_CAO_SAN_PHAM_THUONG_MAI,
  BAO_CAO_DOANH_THU_THUONG_MAI,
  LIET_KE_KHACH_HANG,
  LIET_KE_NHAN_VIEN,
  LIET_KE_QUYEN,
  LIET_KE_NHAT_KY,
  BAO_CAO_TIEN_DO_MAY,
  LIET_KE_MA_GIAM_GIA,
  THEM_MA_GIAM_GIA,
  BAO_CAO_NGAY,
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

export const getUserPermissions = (id) => async (dispatch) => {
  const {data} = await Axios.get(`/getUserPermissions.${id}`);
  dispatch({type: LIET_KE_QUYEN, payload: data})
}

export const getCustomerData = () => async (dispatch) => {
    const { data } = await Axios.get("/admin/users/getCustomer");
    dispatch({ type: LIET_KE_KHACH_HANG, payload: data });  
};
export const getStaffData = () => async (dispatch) => {
    const { data } = await Axios.get("/admin/users/getStaff");
    dispatch({ type: LIET_KE_NHAN_VIEN, payload: data });  
};

export const addUser = (dataReq) => async (dispatch) => {
  const abc = {};
  dataReq.forEach((value, key) => (abc[key] = value));
  abc.id = parseInt(abc.id);
  const { data } = await Axios.post("/admin/users/add", dataReq);
  dispatch({ type: THEM_USER, payload: data });
};

export const editUser = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/users/edit`, dataReq);
  dispatch({ type: SUA_USER, payload: data });
  // console.log(data);
};

export const deleteUser = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/users/delete`, dataReq);
  dispatch({type: XOA_USER, payload: data})
}

export const changeStatusUser = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post("/admin/users/changeStatus", dataReq);
  dispatch({ type: THAY_DOI_TRANG_THAI_USER, payload: data });
}

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

export const addProduct = (dataReq) => async (dispatch) => {
  const {data} = await Axios.post("/admin/products/add", dataReq);
  dispatch({ type: THEM_SAN_PHAM, payload: data });
}

export const editProduct = (dataReq) => async (dispatch) => {
  // const abc = {};
  // data.forEach((value, key) => (abc[key] = value));
  const { data } = await Axios.post("/admin/products/edit", dataReq);
  dispatch({ type: CHINH_SUA_THONG_TIN_SAN_PHAM, payload: data });
};

export const deleteProduct = (dataReq) => async (dispatch) => {
  const {data} = await Axios.post(`/admin/products/delete`, dataReq);
  dispatch({ type: XOA_SAN_PHAM, payload: data});
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

export const addCloth = (dataReq) => async (dispatch) => {
  let abc = {};
  dataReq.forEach((value, key) => (abc[key] = value));
  abc.id = parseInt(abc.id)
  const {data} = await Axios.post("/admin/cloth/add", dataReq);
  dispatch({ type: THEM_VAI, payload: data });
};

export const editCloth = (dataReq) => async (dispatch) => {
  // const abc = {};
  // data.forEach((value, key) => (abc[key] = value));
  const { data } = await Axios.post("/admin/cloth/edit", dataReq);
  dispatch({ type: CHINH_SUA_THONG_TIN_VAI, payload: data });
};

export const deleteCloth = (dataReq) => async (dispatch) => {
  const {data} = await Axios.post(`/admin/cloth/delete`, dataReq);
  dispatch({ type: XOA_VAI, payload: data });
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
  const { data } = await Axios.post(`/admin/users/editUserInfo`, dataReq);
  dispatch({ type: SUA_THONG_TIN_USER, payload: abc });
  localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
  console.log(data);
};

export const getOrderData = (dataReq) => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_DON_HANG });
  try {
    const { data } = await Axios.post(`/getOrderData`, dataReq);
    dispatch({ type: LIET_KE_DON_HANG, payload: data });
  } catch (error) {
    dispatch({ type: LIET_KE_DON_HANG_THAT_BAI, payload: error.message });
  }
};

export const addOrder = (dataReq) => async (dispatch) => {
  console.log("Nhan ve", dataReq)
  const { data } = await Axios.post("/admin/order/add", dataReq);
  console.log(data)
  dispatch({ type: THEM_DON_HANG, payload: dataReq });
};

export const editOrder = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post("/admin/order/edit", dataReq);
  dispatch({ type: CHINH_SUA_THONG_TIN_DON_HANG, payload: data, msg: data });
};

export const deleteOrder = (data) => async (dispatch) => {
  dispatch({ type: XOA_DON_HANG, payload: data });
  // await Axios.get(`/admin/Order/delete.${data}`);
};

export const cancelOrder = (data) => async (dispatch) => {
  console.log("delete", data)
  dispatch({ type: HUY_DON_HANG, payload: data });
  // await Axios.get(`/admin/Order/delete.${data}`);
};

export const processingOrder = (data) => async (dispatch) => {
  dispatch({ type: XU_LY_DON_HANG, payload: data });
  await Axios.post(`/admin/order/processing`, data);
};

export const getDetailOrder = (dataReq) => async (dispatch) => {
  const { data } = await Axios.get(`/getDetailOrder.${dataReq}`);
  dispatch({ type: XEM_DON_HANG, payload: data });
};

// ================== BAO CAO HOA DON ============================
export const getOrderReportCountData = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/getOrderCount`, dataReq);
  dispatch({ type: BAO_CAO_HOA_DON, payload: data[0] });
};
export const getOrderReportPieChart = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/getCountOrder`, dataReq);
  const temp = [
    { name: "Đợi xử lý", value: parseInt(data[0].processing_count) },
    { name: "Đang may", value: parseInt(data[0].sewing_count) },
    { name: "Vừa may xong", value: parseInt(data[0].sewing_complete_count) },
    { name: "Đang vận chuyển", value: parseInt(data[0].shipping_count) },
    { name: "Đã thanh toán", value: parseInt(data[0].complete_count) },
    { name: "Huỷ bỏ", value: parseInt(data[0].cancel_count) },
  ];
  dispatch({ type: BAO_CAO_TRANG_THAI_HOA_DON, payload: temp });
};
export const getOrderReportStackChart =
  (dataReq, defaultValue) => async (dispatch) => {
    const { data } = await Axios.post(`/admin/getTailorOrder`, dataReq);
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      temp.push({
        name: data[i].name,
        uv: defaultValue - data[i].value < 0 ? 0 : defaultValue - data[i].value,
        pv: data[i].value,
      });
    }
    dispatch({ type: BAO_CAO_TIEN_DO_HOA_DON, payload: temp });
  };

export const getTailorsData =
  (dataReq) => async (dispatch) => {
    const { data } = await Axios.post(`/admin/getTailorsData`, dataReq);
    dispatch({ type: BAO_CAO_TIEN_DO_MAY, payload: data });
  };

export const setDateData = (data) =>  (dispatch) => {
    dispatch({ type: BAO_CAO_NGAY, payload: data });
};

// ================== BAO CAO THUONG MAI ============================
export const getEcommerceReportCountData = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/getDataCount`, dataReq);
  dispatch({ type: BAO_CAO_THUONG_MAI, payload: data[0] });
};
export const getEcommerceReportPieChart = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/getCountProductSold`, dataReq);
  for (let i = 0; i < data.length; i++) {
    data[i].value = parseInt(data[i].value);
  }
  dispatch({ type: BAO_CAO_SAN_PHAM_THUONG_MAI, payload: data });
};
export const getEcommerceReportLineChart =
  (dataReq) => async (dispatch) => {
    // function getDayName(dateStr) {
    //   let date = new Date(dateStr)
    //   return date.toLocaleDateString("en-us", { weekday: "long" });
    // }
    const { data } = await Axios.post(`/admin/getRevenue`, dataReq);
    // for (let i=0; i<data.length; i++){
    //   data[i].revenue_date = getDayName(data[i].revenue_date);
    // }
    dispatch({ type: BAO_CAO_DOANH_THU_THUONG_MAI, payload: data });
  };


  // ================== NHAT KY HOAT DONG ============================
export const getActivityLogData = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/getActivityLog`, dataReq);
  for (let i = 0; i < data.length; i++) {
    data[i] = { ...data[i], stt: i + 1 };
  }
  dispatch({ type: LIET_KE_NHAT_KY, payload: data });
};

  // ================== KHACH HANG THAN THIET ============================
export const getLoyaltyCustomerData = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/getLoyaltyCustomer`, dataReq);
  dispatch({ type: LIET_KE_NHAT_KY, payload: data });
};


  // ================== MA GIAM GIA ============================
export const getGiftVoucherData = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/getGiftVoucherData`, dataReq);
  dispatch({ type: LIET_KE_MA_GIAM_GIA, payload: data });
};

export const addGiftVoucher = (dataReq) => async (dispatch) => {
  const { data } = await Axios.post(`/admin/add/voucher`, dataReq);
  console.log(data)
  dispatch({ type: THEM_MA_GIAM_GIA, payload: data });
};