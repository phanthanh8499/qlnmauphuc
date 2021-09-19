import {
  CHINH_SUA_THONG_TIN_SAN_PHAM,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
  LIET_KE_BFM,
  LIET_KE_SAN_PHAM,
  LIET_KE_SFM,
  LIET_KE_TFM,
  LIET_KE_THAT_BAI,
  LIET_KE_USERS_CHUA_CAP_NHAT,
  LIET_KE_USERS_DA_CAP_NHAT,
  LIET_KE_USERS_THANH_CONG,
  LIET_KE_USERS_THAT_BAI,
  SUA_THONG_TIN_USER_THANH_CONG,
  SUA_THONG_TIN_USER_THAT_BAI,
  THEM_SAN_PHAM,
  XOA_SAN_PHAM,
  XOA_USER_THANH_CONG,
  XOA_USER_THAT_BAI,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_LIET_KE_USERS,
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

export const productReducer = (state = { loading: true, productData: [], BFM: [], SFM: [], TFM:[] }, action) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_SP:
      return { loading: true };
    case LIET_KE_SAN_PHAM:
      const data = action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return { loading: true, productData: data };
    case LIET_KE_BFM:
      return {...state, BFM: state.productData.filter(productData => productData.product_typeid === "BFM")}
    case LIET_KE_TFM:
      return {...state, TFM: state.productData.filter(productData => productData.product_typeid === "TFM")}
    case LIET_KE_SFM:
      return {...state, loading: false,  SFM: state.productData.filter(productData => productData.product_typeid === "SFM")}
    case LIET_KE_THAT_BAI:
      return { loading: false, error: action.payload };
    case THEM_SAN_PHAM:
      const product = action.payload;
      return { ...state, productData: [...state.productData, product] };
    case CHINH_SUA_THONG_TIN_SAN_PHAM:
      return { ...state, productData: state.productData.map((item) => {
        if (item.id === parseInt(action.payload.id)) {
          item = action.payload;
          item.id = parseInt(action.payload.id);
          return item;
        } else {
          return item;
        }
      })}
    case XOA_SAN_PHAM: 
      return { ...state, productData: state.productData.filter(productData => productData.id !== action.payload)}
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
  },
  action
) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_USERS:
      return { ...state, loading: true };
    case LIET_KE_USERS_THANH_CONG:
      return { ...state, loading: false, userData: action.payload };
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
    case SUA_THONG_TIN_USER_THANH_CONG:
      return { loading: false, message: action.message };
    case SUA_THONG_TIN_USER_THAT_BAI:
      return { loading: false, editError: action.message };
    case XOA_USER_THANH_CONG:
      return {
        ...state,
        userData1: state.userData1.filter(
          (userData) => userData.id !== action.deleteid
        ),
        userData2: state.userData2.filter(
          (userData) => userData.id !== action.deleteid
        ),
      };
    case XOA_USER_THAT_BAI:
      return { loading: false, deleteError: action.message };
    default:
      return state;
  }
};