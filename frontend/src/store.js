import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userAddReducer,
} from "./reducers/userReducers";
import {
  docDeleteReducer,
  docListReducer,
  docUploadReducer,
} from "./reducers/docReducers";

const reducer = {
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userAdd: userAddReducer,
  docUpload: docUploadReducer,
  docList: docListReducer,
  docDelete: docDeleteReducer,
};
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
