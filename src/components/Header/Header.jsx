import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../../redux/actions/userAction";

function Header() {
  // const { logout, user } = useContext(UserContext);
  const user = useSelector((state) => state.user.account);

  const [hideHeader, setHideHeader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  // console.log(window.location.pathname === "/login", "Login");

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    // toast.warning("Logged out successfully, please login continue using app");
    // navigate("/");
  };

  useEffect(() => {
    if (user && user.auth === false) {
      toast.warning("Logged out successfully, please login continue using app");
      navigate("/");
    }
  }, [user]);

  // console.log(user, "User logged out");
  return (
    <div className="header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="/"></Navbar.Brand> */}
          <Link to="/" className="navbar-brand">
            Redux App
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/action" className="nav-link">
                    Action
                  </NavLink>
                  <NavLink to="/user" className="nav-link">
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link"> Welcome user {user.email}</span>
                  )}
                  <NavDropdown title="Settings Users" id="basic-nav-dropdown">
                    {user && user.auth ? (
                      <button
                        className="dropdown-item"
                        onClick={() => handleLogout()}
                      >
                        Log out
                      </button>
                    ) : (
                      <Link to="/login" className="dropdown-item">
                        Log in
                      </Link>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
