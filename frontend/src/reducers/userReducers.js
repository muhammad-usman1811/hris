export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USER_LIST_SUCCESS":
      return { users: action.payload };
    case "USER_LIST_FAIL":
      return { error: action.payload };
    case "USER_LIST_RESET":
      return { users: [] };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_SUCCESS":
      return { user: action.payload };
    case "USER_DETAILS_FAIL":
      return { error: action.payload };
    case "USER_DETAILS_RESET":
      return { user: {} };
    default:
      return state;
  }
};

export const userAddReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_ADD_REQUEST":
      return { loading: true };
    case "USER_ADD_SUCCESS":
      return { success: true, message: action.payload };
    case "USER_ADD_FAIL":
      return { error: action.payload };
    default:
      return state;
  }
};
