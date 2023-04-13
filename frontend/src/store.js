import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userAddReducer,
  userEditReducer,
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
  teamLeavesReducer,
  userLeavesReducer,
} from "./reducers/leaveReducers";

const reducer = {
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userAdd: userAddReducer,
  userEdit: userEditReducer,
  docUpload: docUploadReducer,
  docList: docListReducer,
  docDelete: docDeleteReducer,
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
