import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header/Header";
import TableUser from "./components/TableUser/TableUser";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Container>
          <TableUser />
        </Container>
      </div>

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
