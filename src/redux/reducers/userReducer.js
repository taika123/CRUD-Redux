import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  REFRESH,
  USER_OUT,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { email: "", auth: null, token: "" },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      console.log("check actions", action);
      return {
        ...state,
        account: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
          isLoading: false,
          isError: false,
        },
      };

    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case USER_OUT:
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      return {
        ...state,
        account: {
          email: "",
          token: "",
          auth: false,
        },
      };

    case REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          auth: true,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
