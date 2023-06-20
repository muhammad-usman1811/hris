import axios from "axios";

export const requestAttendance = (data) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post("/api/attendanceRequest/add", data, config);
    dispatch({
      type: "ATTENDANCE_REQUEST_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserAttendanceRequest = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_ATTENDANCE_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/api/attendanceRequest/${userInfo._id}`,
      config
    );
    dispatch({
      type: "USER_ATTENDANCE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_ATTENDANCE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeamAttendanceRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TEAM_ATTENDANCE_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/attendanceRequest/team/${userInfo.name}`,
      config
    );
    dispatch({
      type: "TEAM_ATTENDANCE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "TEAM_ATTENDANCE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeamAttendanceRequestsForEM =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: "TEAM_ATTENDANCE_FOR_EM_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/attendanceRequest/team/EM/${userInfo.name}`,
        config
      );
      dispatch({
        type: "TEAM_ATTENDANCE_FOR_EM_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "TEAM_ATTENDANCE_FOR_EM_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const approveBySupervisor = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/attendanceRequest/approve/${id}`, {}, config);
    dispatch({
      type: "ATTENDANCE_APPROVED_BY_SUPERVISOR_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};

export const approveByEM = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/attendanceRequest/approve/EM/${id}`, {}, config);
    dispatch({
      type: "ATTENDANCE_APPROVED_BY_EM_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelBySupervisor = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/attendanceRequest/cancel/${id}`, {}, config);
    dispatch({
      type: "ATTENDANCE_CANCELLED_BY_SUPERVISOR_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};
