import {
    Container,
    Navbar,
    Nav
  
  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header(){
    let navigate = useNavigate();
    return(
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/')}>home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}