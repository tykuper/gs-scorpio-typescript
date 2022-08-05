import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import React from 'react';
import { logout } from '../../store';

const UserNavbar = ({ user }) => {
  //   console.log('**********************', user);
  return (
    <Navbar className="bg-secondary" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={`Hi, ${user.firstName}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#">Account</NavDropdown.Item>
              <NavDropdown.Item href="#">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/home" onClick={() => logout()}>
                Log-out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(UserNavbar);
