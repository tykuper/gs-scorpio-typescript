import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

const GuestNavbar = () => {
  return (
    // <Navbar className="bg-secondary" expand="lg">
    //   <Container>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Dropdown>
          <Dropdown.Toggle className="border-0 bg-secondary">
            <FaUserAlt color="white" fontSize="25px" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/login">Log-in</Dropdown.Item>
            <Dropdown.Item href="/signup">Sign-up</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default GuestNavbar;
