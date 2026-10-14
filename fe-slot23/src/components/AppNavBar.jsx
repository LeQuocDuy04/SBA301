import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function AppNavBar() {
  return (
    <Navbar expand="lg" className="top-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/categories" className="brand">
          <span className="brand-mark">FN</span>
          <span>FUNews <small>Management</small></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
