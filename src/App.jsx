import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header/Header";
import { ToastContainer, toast } from "react-toastify";

import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

function App() {
  const dataUser = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  console.log(dataUser, "dataUser");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <AppRoutes />
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
