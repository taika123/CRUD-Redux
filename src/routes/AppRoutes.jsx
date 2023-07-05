import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import TableUser from "../components/TableUser/TableUser";
import NotFound from "../components/Auth/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <PrivateRoutes path="/user" exact>
          <TableUser />
        </PrivateRoutes> */}

        <Route
          path="/user"
          element={
            <PrivateRoutes>
              <TableUser />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
