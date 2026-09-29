import {Container, Nav, Navbar} from "react-bootstrap";

function AppNavBar(){
    return(
        <Navbar bg="primary" data-bs-theme="dark" expand="md">
            <Container fluid className="px-5">
                <Navbar.Brand>Orchid Gallery</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="text-white" href="#home">Home</Nav.Link>
                        <Nav.Link className="text-white" href="#orchids">Orchids</Nav.Link>
                        <Nav.Link className="text-white" href="#about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;