import React, { useEffect, useState } from "react";
import "./Login.scss";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { loginAPI } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowHidePassword, setShowHidePassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  const navigate = useNavigate();

  // logic navigate use to homepage if user have accounts
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Invalid email Password");
      return;
    }
    setLoadingApi(true);
    let res = await loginAPI(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      toast.success("Created Success");
      navigate("/");
    } else {
      toast.error(res.data.error);
    }
    setLoadingApi(false);
    console.log(res, "check res");
  };
  return (
    <div className="login-account col-12 col-md-4 col-xl-12">
      <div className="form-login">
        <h2>Login</h2>
        <div className="form__header">
          <p>Email or Username</p>
          <p>Login with phone</p>
        </div>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmail(e)}
      />
      <div className="handlepassw">
        <input
          type={isShowHidePassword === true ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => handlePassword(e)}
        />

        {isShowHidePassword === true ? (
          <EyeOutlined
            className="icons-eye"
            onClick={() => setShowHidePassword(!isShowHidePassword)}
          />
        ) : (
          <EyeInvisibleOutlined
            className="icons-eye"
            onClick={() => setShowHidePassword(!isShowHidePassword)}
          />
        )}
      </div>

      <button
        className={email && password ? "btn active" : "btn"}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {loadingApi && (
          <LoadingOutlined style={{ fontSize: 20, color: "blue" }} />
        )}
        <span>Login</span>
      </button>
      <div className="form-forgot">
        <p className="desc">Forgot password ?</p>
        <Link to="/register" className="register-link">
          {" "}
          Register
        </Link>
      </div>
      <div className="back">
        <p>
          <LeftOutlined />
        </p>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}

export default Login;
