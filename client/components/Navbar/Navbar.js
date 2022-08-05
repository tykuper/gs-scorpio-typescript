import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import GuestNavbar from './GuestNavbar';
import UserNavbar from './UserNavbar';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-lg bg-secondary">
    <div className="container-fluid">
      <span>
        <Link className="navbar-brand" to="/home">
          Orca Audio
        </Link>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" aria-current="page" to="/products">
            Products
          </Link>
        </ul>
        <div className="d-flex">
          {isLoggedIn ? <UserNavbar /> : <GuestNavbar />}
          <Link className="nav-link active" aria-current="page" to="/cart">
            Cart
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
