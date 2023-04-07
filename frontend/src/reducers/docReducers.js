export const docUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case "DOC_UPLOAD_REQUEST":
      return { loading: true };
    case "DOC_UPLOAD_SUCCESS":
      return { loading: false, message: action.payload, success: true };
    case "CLEAR_MESSAGE":
      return {};
    case "DOC_UPLOAD_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docListReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case "DOC_LIST_REQUEST":
      return { loading: true };
    case "DOC_LIST_SUCCESS":
      return { loading: false, documents: action.payload };
    case "DOC_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "DOC_LIST_RESET":
      return { documents: [] };
    default:
      return state;
  }
};

export const docDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "DOC_DELETE_REQUEST":
      return { loading: true };
    case "DOC_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "DOC_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
