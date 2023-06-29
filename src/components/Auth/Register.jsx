import React, { useState } from "react";
import "./Login.scss";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { loginAPI, registerLogin } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowHidePassword, setShowHidePassword] = useState(false);
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const registerUsers = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    } else {
      let res = await registerLogin(email, password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        toast.success("Register successfully");
        navigate("/login");
      } else {
        toast.error("Register failed");
      }
      console.log(res, "resgister");
    }
  };
  return (
    <div className="login-account col-12 col-md-4 col-xl-12">
      <div className="form-login">
        <h2>Register</h2>
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
      <p className="desc">Forgot password ?</p>
      <button
        className={email && password ? "btn active" : "btn"}
        disabled={email && password ? false : true}
        onClick={() => registerUsers()}
      >
        Log in
      </button>
      <div className="back">
        <p>
          <LeftOutlined />
        </p>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}

export default Register;
