import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import React from "react";
import { logout } from "../../store";
import { resetCart } from "../../store/cart";
import { resetShipping } from "../../store/shipping";

const UserNavbar = ({ user, resetCart, resetShipping }) => {
  const resetHandler = () => {
    resetCart();
    resetShipping();
  };

  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavDropdown title={`Hi, ${user.firstName}`} id="basic-nav-dropdown">
          <NavDropdown.Item href="/user-account">Account</NavDropdown.Item>
          <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            href="/home"
            onClick={() => {
              logout();
              resetHandler();
            }}
          >
            Log-out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
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
    resetShipping: () => dispatch(resetShipping()),
  };
};

export default connect(mapState, mapDispatchToProps)(UserNavbar);
