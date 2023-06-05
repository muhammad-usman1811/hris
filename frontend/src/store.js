import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userAddReducer,
  userEditReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from "./reducers/userReducers";
import {
  docDeleteReducer,
  docListReducer,
  docUploadReducer,
} from "./reducers/docReducers";
import {
  leaveApproveReducer,
  leaveCancelReducer,
  leaveRequestReducer,
  leavesListReducer,
  teamLeavesReducer,
  userLeavesReducer,
} from "./reducers/leaveReducers";

const reducer = {
  userLogin: userLoginReducer,
  userForgot: userForgotPasswordReducer,
  userReset: userResetPasswordReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userAdd: userAddReducer,
  userEdit: userEditReducer,
  docUpload: docUploadReducer,
  docList: docListReducer,
  docDelete: docDeleteReducer,
  leavesList: leavesListReducer,
  leaveRequest: leaveRequestReducer,
  userLeaves: userLeavesReducer,
  teamLeaves: teamLeavesReducer,
  leaveApprove: leaveApproveReducer,
  leaveCancel: leaveCancelReducer,
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
