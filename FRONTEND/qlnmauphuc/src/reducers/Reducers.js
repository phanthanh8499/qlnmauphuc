import {
  CAP_NHAT_HINH_ANH,
  CHINH_SUA_THONG_TIN_DON_HANG,
  CHINH_SUA_THONG_TIN_SAN_PHAM,
  CHINH_SUA_THONG_TIN_SO_DO,
  CHINH_SUA_THONG_TIN_VAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
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
  SUA_THONG_TIN_USER_THANH_CONG,
  SUA_THONG_TIN_USER_THAT_BAI,
  SUA_USER,
  THAY_DOI_TRANG_THAI_USER,
  THEM_DON_HANG,
  THEM_SAN_PHAM,
  THEM_SO_DO,
  THEM_USER,
  THEM_VAI,
  XEM_DON_HANG,
  XEM_SO_DO,
  XOA_DON_HANG,
  XOA_HINH_ANH,
  XOA_SAN_PHAM,
  XOA_SO_DO,
  XOA_USER,
  XOA_USER_THAT_BAI,
  XOA_VAI,
  XU_LY_DON_HANG,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_DON_HANG,
  YEU_CAU_LIET_KE_SO_DO,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_LIET_KE_USERS,
  YEU_CAU_LIET_KE_VAI,
} from "../constants/Constants";

export const dangNhapReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case YEU_CAU_DANG_NHAP:
      return { loading: true };
    case DANG_NHAP_THANH_CONG:
      return { loading: false, userInfo: action.payload };
    case DANG_NHAP_THAT_BAI:
      return { loading: false, error: action.payload };
    case DANG_XUAT:
      localStorage.removeItem("userInfo");
      return {};
    default:
      return state;
  }
};

export const productReducer = (
  state = { loading: true, productData: [], BFM: [], SFM: [], TFM: [] },
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_SP:
      return { loading: true };
    case LIET_KE_SAN_PHAM:
      const data = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { ...state, loading: false, productData: data };
    case LIET_KE_BFM:
      return {
        ...state,
        BFM: state.productData.filter(
          (productData) => productData.product_typeid === "BFM"
        ),
      };
    case LIET_KE_TFM:
      return {
        ...state,
        TFM: state.productData.filter(
          (productData) => productData.product_typeid === "TFM"
        ),
      };
    case LIET_KE_SFM:
      return {
        ...state,
        loading: false,
        SFM: state.productData.filter(
          (productData) => productData.product_typeid === "SFM"
        ),
      };
    case LIET_KE_THAT_BAI:
      return { loading: false, error: action.payload };
    case THEM_SAN_PHAM:
      const product = action.payload;
      return { ...state, productData: [...state.productData, product] };
    case CHINH_SUA_THONG_TIN_SAN_PHAM:
      return {
        ...state,
        productData: state.productData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item = action.payload;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
      };
    case XOA_SAN_PHAM:
      return {
        ...state,
        productData: state.productData.filter(
          (productData) => productData.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const userReducer = (
  state = {
    loading: true,
    userData: [],
    userData1: [],
    userData2: [],
    userInfo: [],
  },
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_USERS:
      return { ...state, loading: true };
    case LIET_KE_USERS_THANH_CONG:
      const data = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { ...state, loading: false, userData: data };
    case LIET_KE_USERS_DA_CAP_NHAT:
      return {
        ...state,
        userData1: state.userData.filter(
          (userData) => userData.user_firstname !== null
        ),
      };
    case LIET_KE_USERS_CHUA_CAP_NHAT:
      return {
        ...state,
        userData2: state.userData.filter(
          (userData) => userData.user_firstname === null
        ),
      };
    case LIET_KE_USERS_THAT_BAI:
      return { loading: false, error: action.payload };
    case SUA_USER:
      return {
        ...state,
        userData: state.userData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item = action.payload;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
      };
    case THAY_DOI_TRANG_THAI_USER:
      return {
        ...state,
        userData: state.userData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item.user_status = action.payload.status;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
      };
    case XOA_USER:
      return {
        ...state,
        userData: state.userData.filter(
          (userData) => userData.id !== action.payload
        ),
        userData1: state.userData1.filter(
          (userData) => userData.id !== action.deleteid
        ),
        userData2: state.userData2.filter(
          (userData) => userData.id !== action.deleteid
        ),
      };
    case THEM_USER:
      const user = action.payload;
      return {
        ...state,
        userData: [...state.userData, user],
      };
    case XOA_USER_THAT_BAI:
      return { loading: false, deleteError: action.message };
    case SUA_THONG_TIN_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const clothReducer = (
  state = { loading: true, loadingMyData: true, clothData: [], myClothData: [], image: "./images/loadingImg.gif" },
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_VAI:
      return { ...state, loading: true };
    case LIET_KE_VAI:
      const data = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { ...state, loading: false, clothData: data };
    case LIET_KE_VAI_CUA_TOI:
      const myData = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { ...state, loadingMyData: false, myClothData: myData };
    case LIET_KE_VAI_THAT_BAI:
      return { loading: false, error: action.payload };
    case THEM_VAI:
      const product = action.payload;
      return {
        ...state,
        clothData: [...state.clothData, product]
      };
    case CHINH_SUA_THONG_TIN_VAI:
      return {
        ...state,
        clothData: state.clothData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item = action.payload;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
      };
    case XOA_VAI:
      return {
        ...state,
        clothData: state.clothData.filter(
          (clothData) => clothData.id !== action.payload
        ),
      };
    case CAP_NHAT_HINH_ANH:
      return {
        ...state,
        image: action.payload,
      };
    case XOA_HINH_ANH:
      return {
        ...state,
        image: "./images/loadingImg.gif",
      };
    default:
      return state;
  }
};


export const measurementsReducer = (
  state = { loading: true, loadingDetail: true, measurementsData: [], detailData: [], msg : {}},
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_SO_DO:
      return { ...state, loading: true };
    case LIET_KE_SO_DO:
      const data = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { ...state, loading: false, measurementsData: data };
    case LIET_KE_SO_DO_THAT_BAI:
      return { loading: false, error: action.payload };
    case THEM_SO_DO:
      const product = action.payload;
      return { ...state, measurementsData: [...state.measurementsData, product] };
    case CHINH_SUA_THONG_TIN_SO_DO:
      return {
        ...state,
        measurementsData: state.measurementsData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item = action.payload;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
        msg: action.msg,
      };
    case XOA_SO_DO:
      return {
        ...state,
        measurementsData: state.measurementsData.filter(
          (measurementsData) => measurementsData.id !== action.payload
        ),
      };
    case XEM_SO_DO:
      return {
        ...state,
        loadingDetail: false,
        detailData: action.payload,
      };
    default:
      return state;
  }
};

export const orderReducer = (
  state = { loading: true, loadingDetail: true, orderData: [], detailData: [], msg : {}},
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_DON_HANG:
      return { ...state, loading: true };
    case LIET_KE_DON_HANG:
      const data = action.payload.sort(function (a, b) {
        return Date.parse(b.order_startdate) - Date.parse(a.order_startdate);
      });
      return { ...state, loading: false, orderData: data };
    case LIET_KE_DON_HANG_THAT_BAI:
      return { loading: false, error: action.payload };
    case THEM_DON_HANG:
      const order = action.payload;
      return { ...state, orderData: [...state.orderData, order] };
    case CHINH_SUA_THONG_TIN_DON_HANG:
      return {
        ...state,
        orderData: state.orderData.map((item) => {
          if (item.id === parseInt(action.payload.id)) {
            item = action.payload;
            item.id = parseInt(action.payload.id);
            return item;
          } else {
            return item;
          }
        }),
        msg: action.msg,
      };
    case XOA_DON_HANG:
      return {
        ...state,
        orderData: state.orderData.filter(
          (orderData) => orderData.od_orderid !== action.payload
        ),
      };
    case HUY_DON_HANG:
      return {
        ...state,
        orderData: state.orderData.map((item) => {
          if (item.od_orderid === action.payload) {
            item.order_statusid = 10;
            item.os_name = "Đã huỷ";
            item.od_orderid = action.payload;
            return item;
          } else {
            return item;
          }
        }),
      };
    case XU_LY_DON_HANG:
      return {
        ...state,
        orderData: state.orderData.map((item) => {
          if (item.od_orderid === action.payload.od_orderid) {
            item.order_statusid = action.payload.order_statusid;
            item.od_orderid = action.payload.od_orderid;
            return item;
          } else {
            return item;
          }
        }),
        detailData: state.detailData.map((item) => {
          if (item.od_orderid === action.payload.od_orderid) {
            item.order_statusid = action.payload.order_statusid;
            item.od_orderid = action.payload.od_orderid;
            return item;
          } else {
            return item;
          }
        }),
      };
    case XEM_DON_HANG:
      return {
        ...state,
        loadingDetail: false,
        detailData: action.payload,
      };
    default:
      return state;
  }
};
