import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header/Header";
import TableUser from "./components/TableUser/TableUser";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Register from "./components/Auth/Register";
function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<TableUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
