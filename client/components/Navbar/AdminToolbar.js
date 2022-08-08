import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";

const AdminToolbar = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavDropdown title="Admin" id="basic-nav-dropdown">
          <NavDropdown.Item href="/manage/products">
            Manage Products
          </NavDropdown.Item>
          <NavDropdown.Item href="/manage/users">View Users</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};

export default AdminToolbar;
