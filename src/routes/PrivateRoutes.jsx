import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
  // const { user } = useContext(UserContext);
  const user = useSelector((state) => state.user.account);
  if (user && !user.auth) {
    return (
      <>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Well done!</h4>
          <p>You dont have permission to access this route!</p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </div>
      </>
    );
  }

  console.log(props);
  return (
    // <Routes>
    //   <Route path={props.path} element={props.children} />
    // </Routes>
    <>{props.children}</>
  );
};

export default PrivateRoutes;
