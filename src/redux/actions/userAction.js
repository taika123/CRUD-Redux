import { toast } from "react-toastify";
import { loginAPI } from "../../components/services/UserService";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const USER_OUT = "USER_OUT";
export const REFRESH = "REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispath, getState) => {
    dispath({ type: FETCH_USER_LOGIN });

    let res = await loginAPI(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("email", email.trim());
      localStorage.setItem("token", res.token);

      dispath({
        type: FETCH_USER_SUCCESS,
        data: { email, token: res.token },
      });

      //   loginContext(email, res.token);
      //   toast.success("Created Success");
      //   navigate("/");
    } else {
      //errorMessage
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      dispath({
        type: FETCH_USER_ERROR,
      });
    }
  };
};

export const handleLogoutRedux = () => {
  return (dispath, getState) => {
    dispath({ type: USER_OUT });
  };
};

export const handleRefresh = () => {
  return (dispath, getState) => {
    dispath({ type: REFRESH });
  };
};
