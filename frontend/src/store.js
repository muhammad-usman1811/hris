import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = { userLogin: userLoginReducer };
const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  middleware,
  preloadedState,
});

export default store;
