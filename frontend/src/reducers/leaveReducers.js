export const leaveRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case "LEAVE_REQUEST_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const leaveApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case "LEAVE_APPROVE_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const leaveCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case "LEAVE_CANCEL_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const userLeavesReducer = (state = { leaves: [] }, action) => {
  switch (action.type) {
    case "USER_LEAVES_REQUEST":
      return { loading: true };
    case "USER_LEAVES_SUCCESS":
      return { loading: false, leaves: action.payload };
    case "USER_LEAVES_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamLeavesReducer = (state = { leaves: [] }, action) => {
  switch (action.type) {
    case "TEAM_LEAVES_REQUEST":
      return { loading: true };
    case "TEAM_LEAVES_SUCCESS":
      return { loading: false, leaves: action.payload };
    case "TEAM_LEAVES_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
