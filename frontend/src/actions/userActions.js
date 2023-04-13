import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_LIST_RESET" });
  dispatch({ type: "USER_DETAILS_RESET" });
  window.location.replace("/");
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: "USER_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_ADD_REQUEST" });

    const formData = new FormData();
    formData.append("address", userData.address);
    formData.append("blood", userData.blood);
    formData.append("cnic", userData.cnic);
    formData.append("contact", userData.contact);
    formData.append("date", userData.date);
    formData.append("department", userData.department);
    formData.append("designation", userData.designation);
    formData.append("email", userData.email);
    formData.append("emergencyAddress", userData.emergencyAddress);
    formData.append("emergencyName", userData.emergencyName);
    formData.append("employeeId", userData.employeeId);
    formData.append("name", userData.name);
    formData.append("passport", userData.passport);
    formData.append("password", userData.password);
    formData.append("phone", userData.phone);
    formData.append("relation", userData.relation);
    formData.append("role", userData.role);
    formData.append("supervisor", userData.supervisor);
    formData.append("title", userData.title);
    formData.append("workType", userData.workType);
    formData.append("photo", userData.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/users", formData, config);

    dispatch({ type: "USER_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_ADD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_EDIT_REQUEST" });

    const formData = new FormData();
    formData.append("address", userData.address);
    formData.append("blood", userData.blood);
    formData.append("cnic", userData.cnic);
    formData.append("contact", userData.contact);
    formData.append("date", userData.date);
    formData.append("department", userData.department);
    formData.append("designation", userData.designation);
    formData.append("email", userData.email);
    formData.append("emergencyAddress", userData.emergencyAddress);
    formData.append("emergencyName", userData.emergencyName);
    formData.append("employeeId", userData.employeeId);
    formData.append("name", userData.name);
    formData.append("passport", userData.passport);
    formData.append("password", userData.password);
    formData.append("phone", userData.phone);
    formData.append("relation", userData.relation);
    formData.append("role", userData.role);
    formData.append("supervisor", userData.supervisor);
    formData.append("title", userData.title);
    formData.append("workType", userData.workType);
    formData.append("photo", userData.file);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/${userData._id}`,
      formData,
      config
    );

    dispatch({ type: "USER_EDIT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_EDIT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
