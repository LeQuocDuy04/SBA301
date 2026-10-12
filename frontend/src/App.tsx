import { Container, Nav, Navbar } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import OrchidList from './pages/OrchidList'
import OrchidDetail from './pages/OrchidDetail'
import OrchidForm from './pages/OrchidForm'

export default function App() {
  return (
      <>
        <Navbar bg="success" data-bs-theme="dark" expand="lg">
          <Container>
            <Navbar.Brand part="/" >Orchid Management</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link part="/">Danh sách hoa lan</Nav.Link>
              <Nav.Link part="/orchids/new" >Thêm hoa lan</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<OrchidList />} />
            <Route path="/orchids/new" element={<OrchidForm />} />
            <Route path="/orchids/:id" element={<OrchidDetail />} />
            <Route path="/orchids/:id/edit" element={<OrchidForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </>
  )
}
