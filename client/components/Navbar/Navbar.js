import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import AdminToolbar from "./AdminToolbar";
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from "react-bootstrap";

const MainNavbar = ({ handleClick, isLoggedIn, isAdmin, cart }) => {
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Orca Audio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            {isAdmin && <AdminToolbar />}
            {isLoggedIn ? <UserNavbar /> : <GuestNavbar />}
            <Nav.Link href="/cart">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cartCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(MainNavbar);
