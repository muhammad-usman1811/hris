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

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "FORGOT_PASSWORD_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/forgot", { email }, config);

    dispatch({
      type: "FORGOT_PASSWORD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: "RESET_PASSWORD_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/reset-password",
      { password, token },
      config
    );

    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = (id) => (dispatch) => {
  localStorage.removeItem("userInfo");
  // localStorage.removeItem(`checkIn:${id}`);
  // localStorage.removeItem(`checkOut:${id}`);

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

export const addUser = (userData, projectData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_ADD_REQUEST" });

    const formData = new FormData();
    formData.append("photo", userData.file);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("personalEmail", userData.personalEmail);
    formData.append("address", userData.address);
    formData.append("passport", userData.passport);
    formData.append("password", userData.password);
    formData.append("phone", userData.phone);
    formData.append("blood", userData.blood);
    formData.append("cnic", userData.cnic);
    formData.append("dob", userData.dob);
    formData.append("maritalStatus", userData.maritalStatus);
    formData.append("gender", userData.gender);
    formData.append("date", userData.date);
    formData.append("department", userData.department);
    formData.append("shiftStartTime", userData.shiftStartTime);
    formData.append("shiftEndTime", userData.shiftEndTime);
    formData.append("designation", userData.designation);
    formData.append("projectDetails", JSON.stringify(projectData));
    formData.append("reportingOffice", userData.reportingOffice);
    formData.append("reportingDepartment", userData.reportingDepartment);
    formData.append("engagementManager", userData.engagementManager);
    formData.append("permanentDate", userData.permanentDate);
    formData.append("benfits", userData.benefits);
    formData.append("degree", userData.degree);
    formData.append("degreeStartDate", userData.degreeStartDate);
    formData.append("degreeEndDate", userData.degreeEndDate);
    formData.append("institute", userData.institute);
    formData.append("emergencyAddress", userData.emergencyAddress);
    formData.append("emergencyName", userData.emergencyName);
    formData.append("contact", userData.contact);
    formData.append("employeeId", userData.employeeId);
    formData.append("relation", userData.relation);
    formData.append("role", JSON.stringify(userData.role));
    formData.append("employmentStatus", userData.employmentStatus);
    formData.append("salary", userData.salary);
    formData.append("supervisor", userData.supervisor);
    formData.append("title", userData.title);
    formData.append("workType", userData.workType);
    formData.append("fuel", userData.fuel);
    formData.append("medicalAllowance", userData.medicalAllowance);
    formData.append("providentFund", userData.providentFund);
    formData.append("empOfQuarter", userData.empOfQuarter);
    formData.append("paidCertifications", userData.paidCertifications);
    formData.append("annualBonus", userData.annualBonus);
    formData.append("paidTimeOff", userData.paidTimeOff);

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
    formData.append("dob", userData.dob);
    formData.append("maritalStatus", userData.maritalStatus);
    formData.append("contact", userData.contact);
    formData.append("date", userData.date);
    formData.append("department", userData.department);
    formData.append("gender", userData.gender);
    formData.append("shiftStartTime", userData.shiftStartTime);
    formData.append("shiftEndTime", userData.shiftEndTime);
    formData.append("designation", userData.designation);
    formData.append("projects", userData.projects);
    formData.append("reportingOffice", userData.reportingOffice);
    formData.append("reportingDepartment", userData.reportingDepartment);
    formData.append("engagementManager", userData.engagementManager);
    formData.append("permanentDate", userData.permanentDate);
    formData.append("benfits", userData.benefits);
    formData.append("degree", userData.degree);
    formData.append("institute", userData.institute);
    formData.append("degreeStartDate", userData.degreeStartDate);
    formData.append("degreeEndDate", userData.degreeEndDate);
    formData.append("email", userData.email);
    formData.append("personalEmail", userData.personalEmail);
    formData.append("emergencyAddress", userData.emergencyAddress);
    formData.append("emergencyName", userData.emergencyName);
    formData.append("employeeId", userData.employeeId);
    formData.append("name", userData.name);
    formData.append("passport", userData.passport);
    formData.append("password", userData.password);
    formData.append("phone", userData.phone);
    formData.append("relation", userData.relation);
    formData.append("role", userData.role);
    formData.append("employmentStatus", userData.employmentStatus);
    formData.append("salary", userData.salary);
    formData.append("supervisor", userData.supervisor);
    formData.append("title", userData.title);
    formData.append("workType", userData.workType);
    formData.append("fuel", userData.fuel);
    formData.append("medicalAllowance", userData.medicalAllowance);
    formData.append("providentFund", userData.providentFund);
    formData.append("empOfQuarter", userData.empOfQuarter);
    formData.append("paidCertifications", userData.paidCertifications);
    formData.append("annualBonus", userData.annualBonus);
    formData.append("paidTimeOff", userData.paidTimeOff);
    formData.append("photo", userData.imageUrl);

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
      `/api/users/${userData.id}`,
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

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: "USER_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "USER_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
