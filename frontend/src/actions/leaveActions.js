import axios from "axios";

export const requestLeave = (data) => async (dispatch, getState) => {
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
    await axios.post("/api/leaves/request", data, config);
    dispatch({
      type: "LEAVE_REQUEST_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserLeaves = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_LEAVES_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/leaves/${userInfo._id}`, config);
    dispatch({
      type: "USER_LEAVES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_LEAVES_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeamLeaves = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TEAM_LEAVES_REQUEST" });
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
      `/api/leaves/team/${userInfo.name}`,
      config
    );
    dispatch({
      type: "TEAM_LEAVES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "TEAM_LEAVES_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveLeave = (id) => async (dispatch, getState) => {
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

    await axios.put(`/api/leaves/approve/${id}`, {}, config);
    dispatch({
      type: "LEAVE_APPROVE_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelLeave = (id) => async (dispatch, getState) => {
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

    await axios.put(`/api/leaves/cancel/${id}`, {}, config);
    dispatch({
      type: "LEAVE_CANCEL_SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
};
