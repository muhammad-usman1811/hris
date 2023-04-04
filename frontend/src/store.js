import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import { docListReducer, docUploadReducer } from "./reducers/docReducers";

const reducer = {
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  docUpload: docUploadReducer,
  docList: docListReducer,
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
