import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';

const GuestNavbar = () => {
  return (
    <Navbar className="bg-secondary" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Guest User" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Log-in</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign-up</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GuestNavbar;
