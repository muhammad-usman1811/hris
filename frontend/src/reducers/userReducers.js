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
    case "USER_DETAILS_REQUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
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
      return { loading: false, success: true, message: action.payload };
    case "USER_ADD_MESSAGE_RESET":
      return { ...state, message: "" };
    case "USER_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "USER_ADD_RESET":
      return {};
    default:
      return state;
  }
};

export const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_EDIT_REQUEST":
      return { loading: true };
    case "USER_EDIT_SUCCESS":
      return { loading: false, success: true, message: action.payload };
    case "USER_EDIT_FAIL":
      return { loading: false, error: action.payload };
    case "USER_EDIT_RESET":
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };
    case "USER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "USER_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
