import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/");
      // location.reload();
    } else {
      toast.error("You are not logged in");
    }
  };
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
            <Nav className="me-auto">
              {/* <Nav.Link href="/action">Action</Nav.Link> */}
              {/* <Nav.Link href="/link">Another Actions</Nav.Link> */}

              <NavLink to="/action" className="nav-link">
                Action
              </NavLink>
              <NavLink to="/user" className="nav-link">
                Manage Users
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Link to="/login" className="dropdown-item">
                  Log in
                </Link>
                <button
                  className="dropdown-item"
                  onClick={() => handleLogout()}
                >
                  Log out
                </button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
