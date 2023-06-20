export const attendanceRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case "ATTENDANCE_REQUEST_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const userAttendanceRequestReducer = (
  state = { userAttendaceRequest: [] },
  action
) => {
  switch (action.type) {
    case "USER_ATTENDANCE_REQUEST":
      return { loading: true };
    case "USER_ATTENDANCE_SUCCESS":
      return { loading: false, userAttendaceRequest: action.payload };
    case "USER_ATTENDANCE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamAttendanceRequestReducer = (
  state = { attendanceRequests: [] },
  action
) => {
  switch (action.type) {
    case "TEAM_ATTENDANCE_REQUEST":
      return { loading: true };
    case "TEAM_ATTENDANCE_SUCCESS":
      return { loading: false, attendanceRequests: action.payload };
    case "TEAM_ATTENDANCE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamAttendanceRequestForEMReducer = (
  state = { attendanceRequests: [] },
  action
) => {
  switch (action.type) {
    case "TEAM_ATTENDANCE_FOR_EM_REQUEST":
      return { loading: true };
    case "TEAM_ATTENDANCE_FOR_EM_SUCCESS":
      return { loading: false, attendanceRequests: action.payload };
    case "TEAM_ATTENDANCE_FOR_EM_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const requestApprovedBySupervisorReducer = (state = {}, action) => {
  switch (action.type) {
    case "ATTENDANCE_APPROVED_BY_SUPERVISOR_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const requestApprovedByEMReducer = (state = {}, action) => {
  switch (action.type) {
    case "ATTENDANCE_APPROVED_BY_EM_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};

export const requestCancelledBySuervisorReducer = (state = {}, action) => {
  switch (action.type) {
    case "ATTENDANCE_CANCELLED_BY_SUPERVISOR_SUCCESS":
      return { success: true };
    default:
      return state;
  }
};
