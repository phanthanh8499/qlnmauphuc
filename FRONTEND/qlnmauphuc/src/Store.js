import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  clothReducer,
  dangNhapReducer, measurementsReducer, orderReducer, productReducer, userReducer,
} from "./reducers/Reducers";

const reducer = combineReducers({
  dangNhap: dangNhapReducer,
  users: userReducer,
  products: productReducer,
  cloth: clothReducer,
  measurements: measurementsReducer,
  order: orderReducer,
});

const initialState = {
  dangNhap: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "",
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
