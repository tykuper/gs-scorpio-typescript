import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import React from "react";
import { logout } from "../../store";
import { resetCart } from "../../store/cart";

const UserNavbar = ({ user, resetCart }) => {
  const resetCartHandler = () => {
    resetCart();
  };

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
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/home"
                onClick={() => {
                  logout();
                  resetCartHandler();
                }}
              >
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

const mapDispatchToProps = (dispatch) => {
  return {
    resetCart: () => dispatch(resetCart()),
  };
};

export default connect(mapState, mapDispatchToProps)(UserNavbar);
