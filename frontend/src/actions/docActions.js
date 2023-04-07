import axios from "axios";

export const uploadDoc = (name, file) => async (dispatch) => {
  try {
    dispatch({
      type: "DOC_UPLOAD_REQUEST",
    });

    const formData = new FormData();
    formData.append("filename", name);
    formData.append("document", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/documents/upload",
      formData,
      config
    );

    dispatch({
      type: "DOC_UPLOAD_SUCCESS",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DOC_UPLOAD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDocs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DOC_LIST_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/documents", config);

    dispatch({
      type: "DOC_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DOC_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDoc = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CLEAR_MESSAGE" });
    dispatch({ type: "DOC_DELETE_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/documents/${id}`, config);

    dispatch({ type: "DOC_DELETE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "DOC_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
