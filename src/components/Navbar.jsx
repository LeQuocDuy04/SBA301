import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home">
                    Orchid Gallery
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">
                            Home
                        </Nav.Link>

                        <Nav.Link href="#orchids">
                            Orchids
                        </Nav.Link>

                        <Nav.Link href="#about">
                            About
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;